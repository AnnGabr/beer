using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Threading.Tasks;
using BeerApp.PunkApi.Models.Beer;
using BeerApp.PunkApi.Models.Search;
using BeerApp.PunkApi.Services.Interfaces;
using BeerApp.PunkApi.Utilities;

namespace BeerApp.PunkApi.Services
{
    public class PunkApiService : IPunkApiService
    {
	    public readonly string RootUrl = "https://api.punkapi.com/v2/beers";

		public async Task<ICollection<Beer>> GetSearchResultAsync(SearchParams searchParams)
		{
			var serializer = new DataContractJsonSerializer(typeof(List<Beer>));

			var client = new HttpClient();
			string requestUri = UriBuilder.BuildFromQueryParams(RootUrl, searchParams);
			Task<Stream> searchBeersTask = client.GetStreamAsync(requestUri);

			var beers = serializer.ReadObject(await searchBeersTask) as List<Beer>;
			
			return beers;
		}

	    public async Task<Beer> GetBeerByIdAsync(long beerId)
	    {
			var serializer = new DataContractJsonSerializer(typeof(ICollection<Beer>));

		    var client = new HttpClient();
			string requestUri = $"{RootUrl}/{beerId}";
		    Task<Stream> searchBeersTask = client.GetStreamAsync(requestUri);

		    var beer = serializer.ReadObject(await searchBeersTask) as ICollection<Beer>;

		    return beer?.FirstOrDefault();
	    }

	    public Task<ICollection<Beer>> GetBeerByIdsAsync(long[] beerIds)
	    {
		    throw new System.NotImplementedException();
	    }
    }
}
