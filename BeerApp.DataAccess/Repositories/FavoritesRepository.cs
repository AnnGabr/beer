using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using BeerApp.DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace BeerApp.DataAccess.Repositories
{
    public class FavoritesRepository : IFavoritesRepository
    {
	    protected readonly BeerCatalogContext DbContext;

	    public FavoritesRepository(BeerCatalogContext beerCatalogContext)
	    {
		    DbContext = beerCatalogContext;
	    }

	    public async Task<UserFavoriteBeer> AddAsync(UserFavoriteBeer favorite)
	    {
		    EntityEntry<UserFavoriteBeer> addedFavorite = await DbContext.UserFavoriteBeers.AddAsync(favorite);
		    await DbContext.SaveChangesAsync();

		    return addedFavorite.Entity;
	    }

	    public async Task<UserFavoriteBeer> RemoveAsync(UserFavoriteBeer favorite)
	    {
		    EntityEntry<UserFavoriteBeer> removedFavorite = DbContext.UserFavoriteBeers.Remove(favorite);
		    await DbContext.SaveChangesAsync();

		    return removedFavorite.Entity;
	    }

	    public async Task<IReadOnlyList<Beer>> GetRangeAsync(int userId, int toSkip, int toTake)
	    {
		    IReadOnlyList<Beer> beers = await DbContext.UserFavoriteBeers
			    .Where(favorite => favorite.UserId == userId)
                .OrderBy(favorite => favorite.BeerId)
                .Skip(toSkip)
                .Take(toTake)
			    .Join(
				    DbContext.Beers,
				    favorite => favorite.BeerId,
				    beer => beer.BeerId,
				    (favorite, beer) => beer
			    )
			    .ToListAsync();

		    return beers;
	    }

	    public async Task<UserFavoriteBeer> FindAsync(int userId, int beerId)
	    {
		    UserFavoriteBeer userFavoriteBeer = await DbContext.UserFavoriteBeers
			    .FirstOrDefaultAsync(favorite => favorite.UserId == userId && favorite.BeerId == beerId);

			return userFavoriteBeer;
	    }

        public async Task<int> GetCountAsync(int userId)
        {
            int favoritesCount = await DbContext.UserFavoriteBeers
                .Where(favorite => favorite.UserId == userId)
                .CountAsync();

            return favoritesCount;
        }
    }
}
