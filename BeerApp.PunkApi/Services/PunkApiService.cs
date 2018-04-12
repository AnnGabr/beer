using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Threading.Tasks;
using BeerApp.PunkApi.Models.Beer;
using BeerApp.PunkApi.Models.Beer.DetailedBeer;
using BeerApp.PunkApi.Models.Search;
using BeerApp.PunkApi.Services.Interfaces;
using BeerApp.PunkApi.Utilities;

namespace BeerApp.PunkApi.Services
{
    public class PunkApiService : IPunkApiService
    {
	    public readonly string RootUrl = "https://api.punkapi.com/v2/beers";

		public async Task<ICollection<BaseBeer>> GetSearchResultAsync(SearchParams searchParams)
		{
			var serializer = new DataContractJsonSerializer(typeof(List<BaseBeer>));

			var client = new HttpClient();
			string requestUri = UriBuilder.BuildFromQueryParams(RootUrl, searchParams);
			Task<Stream> searchBeersTask = client.GetStreamAsync(requestUri);

			var beers = serializer.ReadObject(await searchBeersTask) as List<BaseBeer>;
			
			return beers;
		}

	    public async Task<DetailedBeer> GetBeerByIdAsync(long beerId)
	    {
			var serializer = new DataContractJsonSerializer(typeof(ICollection<DetailedBeer>));

		    var client = new HttpClient();
			string requestUri = $"{RootUrl}/{beerId}";
		    Task<Stream> searchBeersTask = client.GetStreamAsync(requestUri);

		    var beer = serializer.ReadObject(await searchBeersTask) as ICollection<DetailedBeer>;

		    return beer.FirstOrDefault();
	    }

	    public Task<ICollection<BeerWithDescription>> GetBeerByIdsAsync(long[] beerIds)
	    {
		    throw new System.NotImplementedException();
	    }
    }
}
