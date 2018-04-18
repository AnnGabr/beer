using System;
using System.Threading.Tasks;
using BeerApp.DataAccess.Models;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace BeerApp.DataAccess.Repositories
{
    public class BeerRepository : IBeerRepository
    {
	    protected readonly BeerCatalogContext DbContext;

		public BeerRepository(BeerCatalogContext beerCatalogContext)
		{
			DbContext = beerCatalogContext ?? throw new ArgumentNullException(nameof(beerCatalogContext));
		}

		public async Task<Beer> AddAsync(Beer beer)
		{
			EntityEntry<Beer> addedBeer = await DbContext.Beers.AddAsync(beer);
			await DbContext.SaveChangesAsync();

			return addedBeer.Entity;
		}
    }
}
