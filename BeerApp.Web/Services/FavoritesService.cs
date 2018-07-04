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
        public FavoritesOptions Options { get; }

        protected readonly IFavoritesRepository FavoritesRepository;

		protected readonly IPunkApiService PunkApiService;
		protected readonly IBeerService BeerService;

		protected readonly IMapper Mapper;

		public FavoritesService(IOptions<FavoritesOptions> optionsAccessor, IFavoritesRepository favoritesRepository, 
            IBeerService beerService, IPunkApiService punkApiService, IMapper mapper)
		{
            Options = optionsAccessor.Value;
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
				return false;
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
				return false;
			}

			UserFavoriteBeer removedFavorite = await FavoritesRepository.RemoveAsync(favoriteBeer);

			return removedFavorite != null;
		}

		protected async Task<UserFavoriteBeer> GetFavoriteAsync(int userId, int beerId)
		{
			UserFavoriteBeer userFavoriteBeer = await FavoritesRepository.FindAsync(userId, beerId);

			return userFavoriteBeer;
		}

		public async Task<FavoritesPage> GetByPageAsync(int userId, int page)
		{
            int favoritesCount = await FavoritesRepository.GetCountAsync(userId);
            int pagesCount = GetPagesCount(favoritesCount);
            page = GetValidPage(page, pagesCount);

            int toSkip = ((page - 1) * Options.PerPage);
            int toTake = Options.PerPage;

            IEnumerable<Beer> favoriteBeers = await FavoritesRepository.GetRangeAsync(userId, toSkip, toTake);

			int[] favoritePunkBeerIds = favoriteBeers
				.Select(beer => beer.PunkBeerId)
				.ToArray();
			IEnumerable<PunkApiBeer> favoritePunkBeers = await PunkApiService.GetBeerByIdsAsync(favoritePunkBeerIds);

            IEnumerable<BeerWithDescription> zippedBeers = 
                BeerService.ZipMany<BeerWithDescription>(favoritePunkBeers, favoriteBeers);

            return new FavoritesPage
            {
                Page = page,
                PerPage = Options.PerPage,
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
        private int GetPagesCount(int itemsCount)
        {
            int fullPages = itemsCount / Options.PerPage;
            int notFullPages = itemsCount % Options.PerPage > 0 ? 1 : 0;

            return fullPages + notFullPages;
        }

		protected int[] GetAllBeerIds(IEnumerable<Beer> beers)
		{
			return beers
				.Select(beer => beer.BeerId)
				.ToArray();
		}
	}
}
