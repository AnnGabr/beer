using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BeerApp.DataAccess.Models;
using BeerApp.DataAccess.Repositories;
using BeerApp.PunkApi.Services;
using PunkApiBeer = BeerApp.PunkApi.Models.Beer.Beer;
using BeerApp.Web.Models.Beer;
using BeerApp.Web.Models.Search;
using Microsoft.Extensions.Options;

namespace BeerApp.Web.Services
{
	public class FavoritesService : IFavoritesService
	{
        protected readonly IFavoritesRepository FavoritesRepository;

		protected readonly IPunkApiService PunkApiService;
		protected readonly IBeerService BeerService;

		protected readonly IMapper Mapper;

		public FavoritesService(IFavoritesRepository favoritesRepository, IBeerService beerService,
            IPunkApiService punkApiService, IMapper mapper)
		{
            FavoritesRepository = favoritesRepository;
			BeerService = beerService;
			PunkApiService = punkApiService;
			Mapper = mapper;
		}

		public async Task<bool> AddAsync(int userId, int punkBeerId) //TODO: change to beer model in 4 phase
		{
            //TODO: check if exist in punk api

			Beer beer = await BeerService.FindFirstAsync(punkBeerId)
				?? await BeerService.AddAsync(punkBeerId);

			UserFavoriteBeer favoriteBeer = await GetFavoriteAsync(userId, beer.BeerId);
			if (favoriteBeer != null)
			{
				return true;
			}

			UserFavoriteBeer addedFavorite = await FavoritesRepository.AddAsync(new UserFavoriteBeer
			{
				BeerId = beer.BeerId,
				UserId = userId
			});

			return addedFavorite != null;
		}

		public async Task<bool> RemoveAsync(int userId, int beerId)
		{
			UserFavoriteBeer favoriteBeer = await GetFavoriteAsync(userId, beerId);
			if (favoriteBeer == null)
			{
				return true;
			}

			UserFavoriteBeer removedFavorite = await FavoritesRepository.RemoveAsync(favoriteBeer);

			return removedFavorite != null;
		}

		protected async Task<UserFavoriteBeer> GetFavoriteAsync(int userId, int beerId)
		{
			UserFavoriteBeer userFavoriteBeer = await FavoritesRepository.FindAsync(userId, beerId);

			return userFavoriteBeer;
		}

		public async Task<FavoritesPage> GetByPageAsync(int userId, int page, int perPage)
		{
            int favoritesCount = await FavoritesRepository.GetCountAsync(userId); //TODO: sync start
            int pagesCount = GetPagesCount(favoritesCount, perPage);
            page = GetValidPage(page, pagesCount);

            int toSkip = ((page - 1) * perPage);
            int toTake = perPage;

            IEnumerable<Beer> favoriteBeers = await FavoritesRepository.GetRangeAsync(userId, toSkip, toTake); //TODO: sync end

			int[] favoritePunkBeerIds = favoriteBeers
				.Select(beer => beer.PunkBeerId)
				.ToArray();
			IEnumerable<PunkApiBeer> favoritePunkBeers = await PunkApiService.GetBeerByIdsAsync(favoritePunkBeerIds);

            IEnumerable<BeerWithDescription> zippedBeers = 
                BeerService.ZipMany<BeerWithDescription>(favoritePunkBeers, favoriteBeers);

            return new FavoritesPage
            {
                Page = page,
                PagesCount = pagesCount,
                Beers = zippedBeers
            };
		}

        private int GetValidPage(int currentPage, int pagesCount)
        {
            currentPage = currentPage > pagesCount ? pagesCount : currentPage;
            currentPage = currentPage < 1 ? 1 : currentPage;

            return currentPage;
        }

        private int GetPagesCount(int itemsCount, int countPerPage)
        {
            int fullPages = itemsCount / countPerPage;
            int notFullPages = itemsCount % countPerPage > 0 ? 1 : 0;

            return fullPages + notFullPages;
        }
	}
}
