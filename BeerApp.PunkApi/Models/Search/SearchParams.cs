namespace BeerApp.PunkApi.Models.Search
{
	public class SearchParams
	{
		public long? PerPage { get; }
		public long? Page { get; set; }

		public string Name { get; set; }

		public int? Abv { get; set; }
		public int? Ebc { get; set; }
		public int? Ibu { get; set; }
	}
}
