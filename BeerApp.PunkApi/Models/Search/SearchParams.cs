using BeerApp.PunkApi.Utilities;
using BeerApp.PunkApi.Utilities.interfaces;

namespace BeerApp.PunkApi.Models.Search
{
	public class SearchParams : IUrlQueryParams
	{
		[UrlQueryParam(Name = "per_page")]
		public long? PerPage { get; set; }

		[UrlQueryParam(Name = "page")]
		public long? Page { get; set; }

		[UrlQueryParam(Name = "name")]
		public string Name { get; set; }

		[UrlQueryParam(Name = "abv_lt")]
		public int? Abv { get; set; }

		[UrlQueryParam(Name = "ebc_lt")]
		public int? Ebc { get; set; }

		[UrlQueryParam(Name = "ibu_lt")]
		public int? Ibu { get; set; }
	}
}
