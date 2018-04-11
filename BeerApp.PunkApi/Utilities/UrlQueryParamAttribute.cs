using System;

namespace BeerApp.PunkApi.Utilities
{
	[AttributeUsage(AttributeTargets.All)]
	public class UrlQueryParamAttribute : Attribute
    {
		public string Name { get; set; }
    }
}
