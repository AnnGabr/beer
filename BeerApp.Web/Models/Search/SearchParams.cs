namespace BeerApp.Web.Models.Search
{
	public class SearchParams
	{
		public long? PerPage { get; } = 9;
		public long? Page { get; set; } = 1;

		public string BeerName { get; set; }
		
		public int? Abv { get; set; }
		public int? Ebc { get; set; }
		public int? Ibu { get; set; }
	}
}
