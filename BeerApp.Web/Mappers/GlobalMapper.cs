using AutoMapper;
using BeerApp.Web.Mappers.Profiles;

namespace BeerApp.Web.Mappers
{
    public class GlobalMapper
    {
		public static IMapper GetConfiguredMapper()
		{
			return new MapperConfiguration(cfg =>
			{
				cfg.AddProfile(new SearchProfile());
				cfg.AddProfile(new BeerProfile());
				cfg.AddProfile(new UserProfile());
			})
			.CreateMapper();
		}
    }
}
