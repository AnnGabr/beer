namespace BeerApp.Web.Models.Search
{
	public class SearchParams
	{
		public int? PerPage { get; } = 9;
		public int? Page { get; set; } = 1;

		public string BeerName { get; set; }
		
		public float? Abv { get; set; }
		public float? Ebc { get; set; }
		public float? Ibu { get; set; }
	}
}
