namespace BeerApp.Web.Models.Beer
{
    public class BaseBeer : IBeer
    {
	    public int? Id { get; set; }
	    public int PunkId { get; set; }

		public string BeerName { get; set; }
	    public string Tagline { get; set; }
	    public string ImageUrl { get; set; }
    }
}
