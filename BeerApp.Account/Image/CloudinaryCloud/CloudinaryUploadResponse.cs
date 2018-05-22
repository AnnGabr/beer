using System.Net;

namespace BeerApp.Account.Image.CloudinaryCloud
{
	public class CloudinaryUploadResponse
	{
		public CloudinaryUploadResponse() {}
		public CloudinaryUploadResponse(HttpStatusCode responseStatusCode)
		{
			StatusCode = responseStatusCode;
		}
		public CloudinaryImage Image { get; set; }
		public HttpStatusCode StatusCode { get; set; }
		public string Error { get; set; }
	}
}
