using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using AutoMapper;
using BeerApp.DataAccess.Models;
using BeerApp.DataAccess.Repositories;
using BeerApp.PunkApi.Models.Search;
using BeerApp.PunkApi.Services;
using BeerApp.Web.Models.Beer;
using PunkApiSearchParams = BeerApp.PunkApi.Models.Search.SearchParams;
using PunkApiBeer = BeerApp.PunkApi.Models.Beer.Beer;
using BeerApiSearchParams = BeerApp.Web.Models.Search.SearchParams;

namespace BeerApp.Web.Services
{
	public class BeerService : IBeerService
	{
		protected readonly IBeerRepository BeerRepository;
		protected readonly IPunkApiService PunkApiService;

		protected readonly IMapper Mapper;

		public BeerService(IBeerRepository beerRepository, IPunkApiService punkApiService, IMapper mapper)
		{
			BeerRepository = beerRepository ?? throw new ArgumentNullException(nameof(beerRepository));
			PunkApiService = punkApiService ?? throw new ArgumentNullException(nameof(PunkApiService));

			Mapper = mapper ?? throw new ArgumentNullException(nameof(Mapper));
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

		public async Task<DetailedBeer> Get(long punkBeerId)
		{
			PunkApiBeer punkApiBeer = await PunkApiService.GetBeerByIdAsync(punkBeerId);
			if (punkApiBeer == null)
			{
				return null;
			}

			Beer beer = await BeerRepository.FindFirstAsync(punkBeerId);
			if (beer == null)
			{
				return Mapper.Map<DetailedBeer>(punkApiBeer);
			}

			return ZipSingle<DetailedBeer>(punkApiBeer, beer);
		}

		/*public async Task<BaseBeer> Get(SearchParams searchParams) //TODO: zip searched
		{
			IEnumerable<PunkApiBeer> punkApiBeers = await PunkApiService
				.GetSearchResultAsync(Mapper.Map<PunkApiSearchParams>(searchParams));

			IEnumerable<Beer> beers = new List<Beer>();

			return ZipMany<BaseBeer>(punkApiBeers, beers);
		}*/

		public TOut ZipSingle<TOut>(PunkApiBeer punkBeer, Beer beer) where TOut : IBeer
		{
			var outBeer = Mapper.Map<TOut>(punkBeer);

			return Mapper.Map(beer, outBeer);
		}

		public IReadOnlyList<TOut> ZipMany<TOut>(IEnumerable<PunkApiBeer> punkBeers, IEnumerable<Beer> beers) where TOut : IBeer
		{
			var outBeers = Mapper.Map<IReadOnlyList<TOut>>(punkBeers);
			return outBeers.Join(
					beers,
					ob => ob.PunkId,
					b => b.PunkBeerId,
					(ob, b) =>
						AutoMapper.Mapper.Map(b, ob)
				)
				.ToList();
		}
	}
}
