using System;

namespace BeerApp.PunkApi.Utilities
{
	[AttributeUsage(AttributeTargets.All)]
	public class UriParamAttribute : Attribute
    {
		public string Name { get; set; }
    }
}
