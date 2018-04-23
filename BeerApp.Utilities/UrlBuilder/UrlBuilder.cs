using System.Collections.Generic;
using System.Reflection;

namespace BeerApp.Utilities.UrlBuilder
{
	public class UrlBuilder
	{
		public static string BuildFromQueryParams(string rootUrl, IUrlParams queryParams)
		{
			string urlQuery = BuildUrlQuery(queryParams);
			return urlQuery.Equals(string.Empty) ? rootUrl : $"{rootUrl}?{urlQuery}";
		}

		public static string BuildUrlQuery(IUrlParams queryParams)
		{
			var urlQueryParams = new List<string>();

			PropertyInfo[] queryParamsProps = queryParams.GetType()
				.GetProperties();
			foreach (PropertyInfo propInfo in queryParamsProps)
			{
				string urlQueryParamName = GetUrlParamName(propInfo);
				if (urlQueryParamName == null)
				{
					continue;
				}

				object urlQueryParamValue = GetUrlParamValue(propInfo, queryParams);
				if (urlQueryParamValue == null)
				{
					continue;
				}

				urlQueryParams.Add($"{urlQueryParamName}={urlQueryParamValue}");
			}

			return string.Join("&", urlQueryParams);
		}


		private static string GetUrlParamName(PropertyInfo propInfo)
		{
			return propInfo
				.GetCustomAttribute<UrlParamAttribute>()?
				.Name;
		}

		private static object GetUrlParamValue(PropertyInfo propInfo, IUrlParams urlParams)
		{
			return propInfo.CanRead
				? propInfo.GetValue(urlParams)
				: null;
		}
	}	
}
