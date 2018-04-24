namespace BeerApp.Web.Models.Beer
{
    public class BaseBeer
    {
	    public long? Id { get; set; }
		public long PunkId { get; set; }

	    public string BeerName { get; set; }
	    public string Tagline { get; set; }
	    public string ImageUrl { get; set; }
    }
}
