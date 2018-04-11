using System.Collections.Generic;
using System.IO;
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

	    private static readonly HttpClient Client = new HttpClient();

		public async Task<ICollection<BaseBeer>> GetSearchResultAsync(SearchParams searchParams)
		{
			var serializer = new DataContractJsonSerializer(typeof(List<BaseBeer>));
			string requestUri = UriBuilder.BuildFromQueryParams(RootUrl, searchParams);

			Task<Stream> searchBeersTask = Client.GetStreamAsync(requestUri);
			var beers = serializer.ReadObject(await searchBeersTask) as List<BaseBeer>;
			
			return beers;
		}
	}
}
