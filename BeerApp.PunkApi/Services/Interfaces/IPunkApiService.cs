using System.Collections.Generic;
using System.Threading.Tasks;
using BeerApp.PunkApi.Models.Beer;
using BeerApp.PunkApi.Models.Search;

namespace BeerApp.PunkApi.Services
{
    public interface IPunkApiService
    {
	    Task<IReadOnlyList<Beer>> GetSearchResultAsync(SearchParams searchParams);
	    Task<Beer> GetBeerByIdAsync(int beerId);
	    Task<IReadOnlyList<Beer>> GetBeerByIdsAsync(int[] beerIds);
    }
}
