using BeerApp.PunkApi.Utilities;
using BeerApp.PunkApi.Utilities.interfaces;

namespace BeerApp.PunkApi.Models.Search
{
	public class SearchParams : IUriParams
	{
		[UriParam(Name = "per_page")]
		public long? PerPage { get; set; }

		[UriParam(Name = "page")]
		public long? Page { get; set; }

		[UriParam(Name = "beer_name")]
		public string BeerName { get; set; }

		[UriParam(Name = "abv_lt")]
		public int? Abv { get; set; }

		[UriParam(Name = "ebc_lt")]
		public int? Ebc { get; set; }

		[UriParam(Name = "ibu_lt")]
		public int? Ibu { get; set; }
	}
}
