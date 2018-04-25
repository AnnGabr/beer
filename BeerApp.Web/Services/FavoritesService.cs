using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BeerApp.DataAccess.Models;
using BeerApp.DataAccess.Repositories;
using BeerApp.PunkApi.Services;
using PunkApiBeer = BeerApp.PunkApi.Models.Beer.Beer;
using BeerApp.Web.Models.Beer;

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
			FavoritesRepository = favoritesRepository 
				?? throw new ArgumentNullException(nameof(favoritesRepository));

			BeerService = beerService ?? throw new ArgumentNullException(nameof(beerService));
			PunkApiService = punkApiService ?? throw new ArgumentNullException(nameof(PunkApiService));

			Mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
		}

		public async Task<bool> AddAsync(long userId, long punkBeerId) //TODO: change to beer model in 4 phase
		{
			Beer beer = await BeerService.FindFirstAsync(punkBeerId)
				?? await BeerService.AddAsync(punkBeerId);

			bool isFavorite = await IsFavoriteAsync(userId, beer.BeerId);
			if (isFavorite)
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
			bool isFavorite = await IsFavoriteAsync(userId, beerId);
			if (!isFavorite)
			{
				return false;
			}

			UserFavoriteBeer removedFavorite = await FavoritesRepository.RemoveAsync(new UserFavoriteBeer
			{
				BeerId = beerId,
				UserId = userId
			});

			return removedFavorite != null;
		}

		protected async Task<bool> IsFavoriteAsync(long userId, long beerId)
		{
			UserFavoriteBeer userFavoriteBeer = await FavoritesRepository.FindAsync(userId, beerId);

			return userFavoriteBeer != null;
		}

		public async Task<IReadOnlyList<BeerWithDescription>> GetAllAsync(long userId)
		{
			IEnumerable<Beer> favoriteBeers = await FavoritesRepository.GetAllAsync(userId);

			long[] favoritePunkBeerIds = favoriteBeers
				.Select(beer => beer.PunkBeerId)
				.ToArray();
			IEnumerable<PunkApiBeer> favoritePunkBeers = await PunkApiService.GetBeerByIdsAsync(favoritePunkBeerIds);

			return Zip(favoritePunkBeers, favoriteBeers);
		}

		protected IReadOnlyList<BeerWithDescription> Zip(IEnumerable<PunkApiBeer> punkBeers, IEnumerable<Beer> beers)
		{
			var beersWithDescription = Mapper.Map<IReadOnlyList<BeerWithDescription>>(punkBeers);

			IReadOnlyList<BeerWithDescription> zipResult = beersWithDescription.Join(
					beers,
					bwd => bwd.PunkId,
					b => b.PunkBeerId,
					(bwd, b) =>
						Mapper.Map(b, bwd)
				)
				.ToList();

			return zipResult;
		}
	}
}
