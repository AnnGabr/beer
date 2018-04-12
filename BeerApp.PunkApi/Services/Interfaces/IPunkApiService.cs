using System.Collections.Generic;
using System.Threading.Tasks;
using BeerApp.PunkApi.Models.Beer;
using BeerApp.PunkApi.Models.Beer.DetailedBeer;
using BeerApp.PunkApi.Models.Search;

namespace BeerApp.PunkApi.Services.Interfaces
{
    public interface IPunkApiService
    {
	    Task<ICollection<BaseBeer>> GetSearchResultAsync(SearchParams searchParams);

	    Task<DetailedBeer> GetBeerByIdAsync(long beerId);

	    Task<ICollection<BeerWithDescription>> GetBeerByIdsAsync(long[] beerIds);
	}
}
