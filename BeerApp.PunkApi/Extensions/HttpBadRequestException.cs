using System.Net;
using System.Net.Http;

namespace BeerApp.PunkApi.Extensions
{
	public class HttpBadRequestException : HttpRequestException
	{
	    public HttpStatusCode StatusCode { get; }

	    public HttpBadRequestException(HttpStatusCode statusCode, string content) : base(content)
	    {
		    StatusCode = statusCode;
	    }
	}
}
