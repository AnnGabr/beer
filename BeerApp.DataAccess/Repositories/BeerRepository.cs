using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BeerApp.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace BeerApp.DataAccess.Repositories
{
    public class BeerRepository : IBeerRepository
    {
	    protected readonly BeerCatalogContext DbContext;

		public BeerRepository(BeerCatalogContext beerCatalogContext)
		{
			DbContext = beerCatalogContext;
		}

		public async Task<Beer> AddAsync(Beer beer)
		{
			EntityEntry<Beer> addedBeer = await DbContext.Beers.AddAsync(beer);
			await DbContext.SaveChangesAsync();

			return addedBeer.Entity;
		}

	    public async Task<Beer> FindFirstAsync(long punkBeerId)
	    {
		    Beer foundBeer = await DbContext.Beers
			    .FirstOrDefaultAsync(beer => beer.PunkBeerId == punkBeerId);

		    return foundBeer;
	    }

	    public async Task<IReadOnlyList<Beer>> FindAll(long[] punkBeerIds)
	    {
		    IReadOnlyList<Beer> foundBeers = await DbContext.Beers
				.Where(beer => punkBeerIds.Contains(beer.PunkBeerId))
				.ToListAsync();

		    return foundBeers;
	    }
	}
}
