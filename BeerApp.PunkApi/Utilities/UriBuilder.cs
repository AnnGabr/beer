using System.Collections.Generic;
using System.Reflection;
using BeerApp.PunkApi.Utilities.interfaces;

namespace BeerApp.PunkApi.Utilities
{
	public class UriBuilder
	{
		public static string BuildFromQueryParams(string rootUrl, IUriParams queryParams)
		{
			string uriQuery = BuildUriQuery(queryParams);
			return uriQuery.Equals(string.Empty) ? rootUrl : $"{rootUrl}?{uriQuery}";
		}

		public static string BuildUriQuery(IUriParams queryParams)
		{
			var uriQueryParams = new List<string>();

			PropertyInfo[] queryParamsProps = queryParams.GetType()
				.GetProperties();
			foreach (PropertyInfo propInfo in queryParamsProps)
			{
				string uriQueryParamName = GetUriParamName(propInfo);
				if (uriQueryParamName == null)
				{
					continue;
				}

				object uriQueryParamValue = GetUriParamValue(propInfo, queryParams);
				if (uriQueryParamValue == null)
				{
					continue;
				}

				uriQueryParams.Add($"{uriQueryParamName}={uriQueryParamValue}");
			}

			return string.Join("&", uriQueryParams);
		}


		private static string GetUriParamName(PropertyInfo propInfo)
		{
			return propInfo
				.GetCustomAttribute<UriParamAttribute>()?
				.Name;
		}

		private static object GetUriParamValue(PropertyInfo propInfo, IUriParams uriParams)
		{
			return propInfo.CanRead
				? propInfo.GetValue(uriParams)
				: null;
		}
	}	
}
