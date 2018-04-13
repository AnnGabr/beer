using System;

namespace BeerApp.PunkApi.Utilities
{
	[AttributeUsage(AttributeTargets.All)]
	public class UrlParamAttribute : Attribute
    {
		public string Name { get; set; }
    }
}
