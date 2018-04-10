using AutoMapper;
using Microsoft.AspNetCore.Mvc;

using BeerApp.Web.Mappers.Search;

namespace BeerApp.Web.Mappers
{
    public class GlobalMapper : Controller
    {
		public static IMapper GetConfiguredMapper()
		{
			return new MapperConfiguration(cfg =>
			{
				cfg.AddProfile(new SearchProfile());
			})
			.CreateMapper();
		}
    }
}
