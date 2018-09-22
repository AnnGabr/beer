namespace BeerApp.Web.Models.Beer
{
    public class FavoriteBeer: IBeer
    {
		public int? Id { get; set; }
		public int PunkId { get; set; }
	}
}
