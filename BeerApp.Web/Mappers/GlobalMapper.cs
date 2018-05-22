using AutoMapper;
using BeerApp.Account.Image.Mappers;
using BeerApp.Web.Mappers.Profiles;
using BeerApp.Account.Mappers;

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
				cfg.AddProfile(new AccountProfile());
				cfg.AddProfile(new ImageServiceProfile());
			})
			.CreateMapper();
		}
    }
}
