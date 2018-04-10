using System.Collections.Generic;
using BeerApp.PunkApi.Models.Beer;
using BeerApp.PunkApi.Models.Search;

namespace BeerApp.PunkApi.Services.Interfaces
{
    public interface IPunkApiService
    {
	    ICollection<BaseBeer> GetSearchResult(SearchParams searchParams);
    }
}
