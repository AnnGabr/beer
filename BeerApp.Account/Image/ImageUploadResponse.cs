namespace BeerApp.Account.Image
{
    public class ImageUploadResponse
    {
		public string ImageId { get; set; }
	    public string Error { get; set; }
		public bool Succeeded
	    {
		    get => Error == null;
	    }
	}
}
