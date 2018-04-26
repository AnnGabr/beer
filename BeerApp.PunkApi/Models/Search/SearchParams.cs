using BeerApp.Utilities.UrlBuilder;

namespace BeerApp.PunkApi.Models.Search
{
	public class SearchParams : IUrlParams
	{
		[UrlParam(Name = "per_page")]
		public long? PerPage { get; set; }

		[UrlParam(Name = "page")]
		public long? Page { get; set; }

		[UrlParam(Name = "beer_name")]
		public string BeerName { get; set; }

		[UrlParam(Name = "abv_lt")]
		public int? Abv { get; set; }

		[UrlParam(Name = "ebc_lt")]
		public int? Ebc { get; set; }

		[UrlParam(Name = "ibu_lt")]
		public int? Ibu { get; set; }

		[UrlParam(Name = "ids")]
		public string BeerIds { get; set; }
	}
}
