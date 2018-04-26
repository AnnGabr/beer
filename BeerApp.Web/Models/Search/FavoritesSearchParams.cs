namespace BeerApp.Web.Models.Search
{
    public class FavoritesSearchParams
    {
		public FavoritesSearchParams(long[] beerIds)
		{
			BeerIds = beerIds;
		}

		public long? PerPage { get; } = 5;
	    public long? Page { get; set; } = 1;
		public long[] BeerIds { get; set; }
	}
}
