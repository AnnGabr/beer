using System.Collections.Generic;
using BeerApp.PunkApi.Models.Beer;
using BeerApp.PunkApi.Models.Search;
using BeerApp.PunkApi.Services.Interfaces;

namespace BeerApp.PunkApi.Services
{
    public class PunkApiService : IPunkApiService
	{
		public ICollection<BaseBeer> GetSearchResult(SearchParams searchParams)
		{
			throw new System.NotImplementedException();
		}
	}
}
