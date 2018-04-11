using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using BeerApp.PunkApi.Models.Search;
using BeerApp.PunkApi.Utilities.interfaces;

namespace BeerApp.PunkApi.Utilities
{
	public class UrlBuilder
	{
		public static string BuildFromQueryParams(string rootUrl, IUrlQueryParams queryParams)
		{
			string urlQuery = BuildUrlQuery(queryParams);

			return urlQuery.Equals(string.Empty) ? rootUrl : $"{rootUrl}?{urlQuery}";
		}

		public static string BuildUrlQuery(IUrlQueryParams queryParams)
		{
			var urlQuery = new StringBuilder();

			PropertyInfo[] queryParamsProps = queryParams.GetType()
				.GetProperties();

			foreach (PropertyInfo propInfo in queryParamsProps)
			{
				string propUrlParamName = propInfo
					.GetCustomAttribute<UrlQueryParamAttribute>()
					.Name;

				object propValue = queryParams.GetType().GetProperty(propInfo.Name);

				if (propValue != null)
				{
					
				}
			}

			return urlQuery.ToString();
		}

		public static string BuildFromRouteParams(string rootUrl, IUrlQueryParams routeParams)
		{
			return "";
		}



		/*private static GetBeersPerPageCountUrlPart(int beersPerPageCount) => $"per_page={beersPerPageCount}";

	const getPageNumberUrlPart = pageNumber => `page=${pageNumber
	}`;

	const getBeerIdsUrlPart = beerIds => `ids=${beerIds.join('|')}`;

	const getBeerNameUrlPart = beerName => `beer_name=${beerName.trim().replace(/\s+/gi, '_')}`;

	const getAlcoholVolumeUrlPart = alcoholVolume => `abv_lt=${alcoholVolume}`;

	const getInternationalBitternessUnitsUrlPart = internationalBitternessUnits =>
	`ibu_lt=${internationalBitternessUnits}`;

	const getColorEbcUrlPart = colorEbc => `ebc_lt=${colorEbc}`;*/
    }	
}
