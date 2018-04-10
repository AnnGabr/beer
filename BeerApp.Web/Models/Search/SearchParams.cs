using Newtonsoft.Json;

namespace BeerApp.Web.Models.Search
{
	public class SearchParams
	{
		public PropertiesFilter Filter { get; set; }
		public string BeerName { get; set; }
		public long PageNumber { get; set; }
		public long BeersPerPageCount { get; } = 9;

		public class PropertiesFilter
		{
			public int AlcoholVolume { get; set; }
			public int ColorEbc { get; set; }
			public int InternationalBitternessUnits { get; set; }

			public PropertiesFilter(int alcoholVolume, int internationalBitternessUnits, int colorEbc)
			{
				AlcoholVolume = alcoholVolume;
				InternationalBitternessUnits = internationalBitternessUnits;
				ColorEbc = colorEbc;
			}
		}
	}
}
