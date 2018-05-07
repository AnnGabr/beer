using System.Collections.Generic;
using System.Threading.Tasks;
using BeerApp.DataAccess.Models;
using BeerApp.Web.Models.Search;
using BeerApp.Web.Models.Beer;
using PunkApiBeer = BeerApp.PunkApi.Models.Beer.Beer;

namespace BeerApp.Web.Services
{
    public interface IBeerService
    {
		Task<Beer> AddAsync(int punkBeerId);
	    Task<bool> IsBeerExistAsync(int punkBeerId);
	    Task<Beer> FindFirstAsync(int punkBeerId);

	    Task<DetailedBeer> SearchOneAsync(int punkBeerId);
	    Task<IReadOnlyList<BaseBeer>> SearchAsync(SearchParams searchParams);

		TOut ZipSingle<TOut>(PunkApiBeer punkBeer, Beer beer) where TOut : IBeer;
		IReadOnlyList<TOut> ZipMany<TOut>(IEnumerable<PunkApiBeer> punkBeers, IEnumerable<Beer> beers) where TOut : IBeer;
    }
}
