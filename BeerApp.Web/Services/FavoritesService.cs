using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BeerApp.DataAccess.Models;
using BeerApp.DataAccess.Repositories;
using BeerApp.PunkApi.Services;
using PunkApiBeer = BeerApp.PunkApi.Models.Beer.Beer;
using PunkApiSearchParams = BeerApp.PunkApi.Models.Search.SearchParams;
using BeerApp.Web.Models.Beer;
using BeerApp.Web.Models.Search;

namespace BeerApp.Web.Services
{
	public class FavoritesService : IFavoritesService
	{
		protected readonly IFavoritesRepository FavoritesRepository;

		protected readonly IPunkApiService PunkApiService;
		protected readonly IBeerService BeerService;

		protected readonly IMapper Mapper;

		public FavoritesService(IFavoritesRepository favoritesRepository, IBeerService beerService, IPunkApiService punkApiService, IMapper mapper)
		{
			FavoritesRepository = favoritesRepository;
			BeerService = beerService;
			PunkApiService = punkApiService;
			Mapper = mapper;
		}

		public async Task<bool> AddAsync(long userId, long punkBeerId) //TODO: change to beer model in 4 phase
		{
			Beer beer = await BeerService.FindFirstAsync(punkBeerId)
				?? await BeerService.AddAsync(punkBeerId);

			UserFavoriteBeer favoriteBeer = await GetFavoriteAsync(userId, beer.BeerId);
			if (favoriteBeer != null)
			{
				return false;
			}

			UserFavoriteBeer addedFavorite = await FavoritesRepository.AddAsync(new UserFavoriteBeer
			{
				BeerId = beer.BeerId,
				UserId = userId
			});

			return addedFavorite != null;
		}

		public async Task<bool> RemoveAsync(long userId, long beerId)
		{
			UserFavoriteBeer favoriteBeer = await GetFavoriteAsync(userId, beerId);
			if (favoriteBeer == null)
			{
				return false;
			}

			UserFavoriteBeer removedFavorite = await FavoritesRepository.RemoveAsync(favoriteBeer);

			return removedFavorite != null;
		}

		protected async Task<UserFavoriteBeer> GetFavoriteAsync(long userId, long beerId)
		{
			UserFavoriteBeer userFavoriteBeer = await FavoritesRepository.FindAsync(userId, beerId);

			return userFavoriteBeer;
		}

		public async Task<IReadOnlyList<BeerWithDescription>> GetAllAsync(long userId)
		{
			IEnumerable<Beer> favoriteBeers = await FavoritesRepository.GetAllAsync(userId);

			long[] favoritePunkBeerIds = favoriteBeers
				.Select(beer => beer.PunkBeerId)
				.ToArray();
			var searchParams = new FavoritesSearchParams(favoritePunkBeerIds);
			IEnumerable<PunkApiBeer> favoritePunkBeers = await PunkApiService.GetSearchResultAsync(Mapper.Map<PunkApiSearchParams>(searchParams));

			return BeerService.ZipMany<BeerWithDescription>(favoritePunkBeers, favoriteBeers);
		}

		protected long[] GetAllBeerIds(IEnumerable<Beer> beers)
		{
			return beers
				.Select(beer => beer.BeerId)
				.ToArray();
		}
	}
}
