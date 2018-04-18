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

		private readonly IMapper mapper;

		public FavoritesService(IFavoritesRepository favoritesRepository, IBeerService beerService, IPunkApiService punkApiService)
		{
			this.FavoritesRepository = favoritesRepository 
				?? throw new ArgumentNullException(nameof(favoritesRepository));

			this.BeerService = beerService ?? throw new ArgumentNullException(nameof(beerService));
			this.PunkApiService = punkApiService ?? throw new ArgumentNullException(nameof(PunkApiService));

			this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
		}

		public async Task AddAsync(long userId, long beerId) //what id to use?
		{
			Beer addedBeer; //TODO: try add new beer
			UserFavoriteBeer addedFavorite = await FavoritesRepository.AddAsync(new UserFavoriteBeer
			{
				BeerId = beerId,
				UserId = userId
			});
		}

		public async Task RemoveAsync(long userId, long beerId)
		{
			UserFavoriteBeer removedFavorite = await FavoritesRepository.RemoveAsync(new UserFavoriteBeer
			{
				BeerId = beerId,
				UserId = userId
			});
		}

		public async Task<IReadOnlyList<BeerWithDescription>> GetAllAsync(long userId)
		{
			long[] favoriteIds = ((IQueryable<Beer>)(await FavoritesRepository.GetAllAsync(userId)))
				.Select(beer => beer.PunkBeerId).ToArray();

			IEnumerable<PunkApiBeer> beers = await PunkApiService.GetBeerByIdsAsync(favoriteIds);

			return mapper.Map<IReadOnlyList<BeerWithDescription>>(beers);
		}
	}
}
