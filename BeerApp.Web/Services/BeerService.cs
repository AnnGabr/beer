using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BeerApp.DataAccess.Models;
using BeerApp.DataAccess.Repositories;
using BeerApp.PunkApi.Services;
using BeerApp.Web.Models.Beer;
using BeerApp.Web.Models.Search;
using PunkApiSearchParams = BeerApp.PunkApi.Models.Search.SearchParams;
using PunkApiBeer = BeerApp.PunkApi.Models.Beer.Beer;

namespace BeerApp.Web.Services
{
	public class BeerService : IBeerService
	{
		protected readonly IBeerRepository BeerRepository;
		protected readonly IPunkApiService PunkApiService;

		protected readonly IMapper Mapper;

		public BeerService(IBeerRepository beerRepository, IPunkApiService punkApiService, IMapper mapper)
		{
			BeerRepository = beerRepository;
			PunkApiService = punkApiService;
			Mapper = mapper;
		}

		public async Task<Beer> AddAsync(long punkBeerId)
		{
			Beer addedBeer = await BeerRepository.AddAsync(new Beer { PunkBeerId = punkBeerId });

			return addedBeer;
		}

		public async Task<bool> IsBeerExistAsync(long punkBeerId)
		{
			Beer isBeerExist = await FindFirstAsync(punkBeerId);

			return isBeerExist != null;
		}

		public async Task<Beer> FindFirstAsync(long punkBeerId)
		{
			Beer foundBeer = await BeerRepository.FindFirstAsync(punkBeerId);

			return foundBeer;
		}

		public async Task<DetailedBeer> SearchOneAsync(long punkBeerId)
		{
			PunkApiBeer punkBeer = await PunkApiService.GetBeerByIdAsync(punkBeerId);
			if (punkBeer == null)
			{
				return null;
			}

			Beer beer = await FindFirstAsync(punkBeerId);
			return beer == null 
				? Mapper.Map<DetailedBeer>(punkBeer) 
				: ZipSingle<DetailedBeer>(punkBeer, beer);
		}

		public async Task<IReadOnlyList<BaseBeer>> SearchAsync(SearchParams searchParams) //TODO: zip searched
		{
			IEnumerable<PunkApiBeer> punkBeers = await PunkApiService
				.GetSearchResultAsync(Mapper.Map<PunkApiSearchParams>(searchParams));

			long[] punkBeerIds = punkBeers
				.Select(beer => beer.PunkId)
				.ToArray();
			IEnumerable<Beer> beers = await BeerRepository.FindAll(punkBeerIds);

			return ZipMany<BaseBeer>(punkBeers, beers);
		}

		public TOut ZipSingle<TOut>(PunkApiBeer punkBeer, Beer beer) where TOut : IBeer
		{
			var mappedPunkBeer = Mapper.Map<TOut>(punkBeer);

			return Mapper.Map(beer, mappedPunkBeer);
		}

		public IReadOnlyList<TOut> ZipMany<TOut>(IEnumerable<PunkApiBeer> punkBeers, IEnumerable<Beer> beers) where TOut : IBeer
		{
			var mappedPunkBeers = Mapper.Map<IReadOnlyList<TOut>>(punkBeers);
			return mappedPunkBeers.GroupJoin(
					beers,
					mappedPunkBeer => mappedPunkBeer.PunkId,
					beerToJoin => beerToJoin.PunkBeerId,
					(mpb, jb) =>
						new { MappedPunkBeer = mpb, JoinedBeers = jb })
				.SelectMany(
					joinResult => joinResult.JoinedBeers.DefaultIfEmpty(),
					(joinResult, joinedBeer) => joinedBeer == null 
						? Mapper.Map<TOut>(joinResult.MappedPunkBeer) 
						: Mapper.Map(joinedBeer, joinResult.MappedPunkBeer))
				.ToList();
		}
	}
}
