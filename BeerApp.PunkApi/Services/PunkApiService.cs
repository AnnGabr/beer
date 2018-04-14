using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Threading.Tasks;
using BeerApp.PunkApi.Models.Beer;
using BeerApp.PunkApi.Models.Search;
using BeerApp.PunkApi.Services.Interfaces;
using UrlBuilder = BeerApp.PunkApi.Utilities.UrlBuilder;

namespace BeerApp.PunkApi.Services
{
    public class PunkApiService : IPunkApiService
    {
	    public readonly string RootUrl = "https://api.punkapi.com/v2/beers";

		protected readonly HttpClient Client = new HttpClient();

		protected readonly DataContractJsonSerializer Serializer = new DataContractJsonSerializer(typeof(ICollection<Beer>));

		public async Task<ICollection<Beer>> GetSearchResultAsync(SearchParams searchParams)
		{
			string requestUri = UrlBuilder.BuildFromQueryParams(RootUrl, searchParams);
			HttpResponseMessage response = await Client.GetAsync(requestUri);

			await EnsureSuccessStatusCode(response);
 
			Stream responseBody = await response.Content.ReadAsStreamAsync();
			var beers = Serializer.ReadObject(responseBody) as ICollection<Beer>;
			
			return beers;
		}

	    public async Task<Beer> GetBeerByIdAsync(long beerId)
	    {
		    string requestUri = $"{RootUrl}/{beerId}";
		    HttpResponseMessage response = await Client.GetAsync(requestUri);

		    await EnsureSuccessStatusCode(response);

		    Stream responseBody = await response.Content.ReadAsStreamAsync();
		    var beers = Serializer.ReadObject(responseBody) as ICollection<Beer>;

		    return beers?.FirstOrDefault();
	    }

	    public async Task<ICollection<Beer>> GetBeerByIdsAsync(long[] beerIds)
	    {
			string requestUri = $"{RootUrl}?ids={string.Join("|", beerIds)}";
		    HttpResponseMessage response = await Client.GetAsync(requestUri);

		    await EnsureSuccessStatusCode(response);

		    Stream responseBody = await response.Content.ReadAsStreamAsync();
		    var beers = Serializer.ReadObject(responseBody) as ICollection<Beer>;

		    return beers;
		}

	    protected async Task EnsureSuccessStatusCode(HttpResponseMessage response)
	    {
			if (!response.IsSuccessStatusCode)
			{
				throw new HttpRequestException(await response.Content.ReadAsStringAsync());
			}
		}
	}
}
