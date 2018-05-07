using BeerApp.Utilities.UrlBuilder;

namespace BeerApp.PunkApi.Models.Search
{
	public class SearchParams : IUrlParams
	{
		[UrlParam(Name = "per_page")]
		public int? PerPage { get; set; }

		[UrlParam(Name = "page")]
		public int? Page { get; set; }

		[UrlParam(Name = "beer_name")]
		public string BeerName { get; set; }

		[UrlParam(Name = "abv_lt")]
		public float? Abv { get; set; }

		[UrlParam(Name = "ebc_lt")]
		public float? Ebc { get; set; }

		[UrlParam(Name = "ibu_lt")]
		public float? Ibu { get; set; }
	}
}
