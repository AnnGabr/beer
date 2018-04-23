using AutoMapper;

using BeerApp.Account.Models;
using BeerApp.Web.Models.User;

namespace BeerApp.Web.Mappers.Profiles
{
	public class UserProfile : Profile
	{
		public UserProfile()
		{
			CreateMap<UserToRegister, RegistrationData>();
			CreateMap<UserToLogin, LoginParams>();
		}
	}
}
