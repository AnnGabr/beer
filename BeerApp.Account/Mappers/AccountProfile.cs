using AutoMapper;
using BeerApp.Account.Models;
using BeerApp.DataAccess.Models;

namespace BeerApp.Account.Mappers
{
	public class AccountProfile : Profile
	{
		public AccountProfile()
		{
			CreateMap<RegistrationData, User>();
			CreateMap<User, UserProfile>();
		}
	}
}
