using System;

namespace BeerApp.Utilities.UrlBuilder
{
	[AttributeUsage(AttributeTargets.All)]
	public class UrlParamAttribute : Attribute
    {
		public string Name { get; set; }
    }
}
