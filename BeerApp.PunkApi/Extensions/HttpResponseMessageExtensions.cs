using System.Net.Http;
using System.Threading.Tasks;

namespace BeerApp.PunkApi.Extensions
{
    public static class HttpResponseMessageExtensions
	{
		public static async Task EnsureSuccessStatusCodeAsync(this HttpResponseMessage response)
		{
			if (response.IsSuccessStatusCode)
			{
				return;
			}

			string content = await response.Content.ReadAsStringAsync();

			response.Content?.Dispose();

			throw new HttpBadRequestException(response.StatusCode, content);
		}
	}
}
