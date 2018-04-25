using System.Collections.Generic;
using System.Threading.Tasks;
using BeerApp.DataAccess.Models;
using BeerApp.Web.Models.Beer;
using PunkApiBeer = BeerApp.PunkApi.Models.Beer.Beer;

namespace BeerApp.Web.Services
{
    public interface IBeerService
    {
		Task<Beer> AddAsync(long punkBeerId);
	    Task<bool> IsBeerExistAsync(long punkBeerId);
	    Task<Beer> FindFirstAsync(long punkBeerId);

	    Task<DetailedBeer> Get(long punkBeerId);

		TOut ZipSingle<TOut>(PunkApiBeer punkBeer, Beer beer) where TOut : IBeer;
		IReadOnlyList<TOut> ZipMany<TOut>(IEnumerable<PunkApiBeer> punkBeers, IEnumerable<Beer> beers) where TOut : IBeer;
    }
}
