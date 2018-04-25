using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Threading.Tasks;
using BeerApp.PunkApi.Extensions;
using BeerApp.PunkApi.Models.Beer;
using BeerApp.PunkApi.Models.Search;
using BeerApp.Utilities.UrlBuilder;

namespace BeerApp.PunkApi.Services
{
    public class PunkApiService : IPunkApiService
    {
	    public readonly string RootUrl = "https://api.punkapi.com/v2/beers";

		protected readonly HttpClient Client = new HttpClient();

		protected readonly DataContractJsonSerializer Serializer = new DataContractJsonSerializer(typeof(ICollection<Beer>));

		public async Task<IReadOnlyList<Beer>> GetSearchResultAsync(SearchParams searchParams)
		{
			string requestUri = UrlBuilder.BuildFromQueryParams(RootUrl, searchParams);

			return await GetBeersAsync(requestUri);
		}

	    public async Task<Beer> GetBeerByIdAsync(long beerId)
	    {
		    string requestUri = $"{RootUrl}/{beerId}";

			return (await GetBeersAsync(requestUri))
				?.FirstOrDefault();
	    }

	    public async Task<IReadOnlyList<Beer>> GetBeerByIdsAsync(long[] beerIds)
	    {
			string requestUri = $"{RootUrl}?ids={string.Join("|", beerIds)}";

		    return await GetBeersAsync(requestUri);
	    }

	    protected async Task<IReadOnlyList<Beer>> GetBeersAsync(string requestUri)
	    {
			HttpResponseMessage response = await Client.GetAsync(requestUri);
		    await response.EnsureSuccessStatusCodeAsync();

		    Stream responseBody = await response.Content.ReadAsStreamAsync();
		    var beers = Serializer.ReadObject(responseBody) as IReadOnlyList<Beer>;

			return beers;
		}
	}
}
