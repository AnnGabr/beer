using AutoMapper;
using BeerApp.DataAccess.Models;
using BeerApp.Web.Models.User;

namespace BeerApp.Web.Mappers.Profiles
{
	public class UserProfile : Profile
	{
		public UserProfile()
		{
			CreateMap<UserDto, User>();
			CreateMap<User, UserDto>();
		}
	}
}
