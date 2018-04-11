using System.Collections.Generic;
using BeerApp.PunkApi.Models.Beer;
using BeerApp.PunkApi.Models.Search;
using BeerApp.PunkApi.Services.Interfaces;
using BeerApp.PunkApi.Utilities;

namespace BeerApp.PunkApi.Services
{
    public class PunkApiService : IPunkApiService
    {
	    public readonly string RootUrl = "";

		public ICollection<BaseBeer> GetSearchResult(SearchParams searchParams)
		{
			UrlBuilder.BuildFromQueryParams(RootUrl, searchParams);
			return new List<BaseBeer>() { null };
		}
	}
}
