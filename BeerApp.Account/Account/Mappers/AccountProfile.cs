using AutoMapper;
using BeerApp.Account.Account.Models;
using BeerApp.DataAccess.Models;

namespace BeerApp.Account.Account.Mappers
{
	public class AccountProfile : Profile
	{
		public AccountProfile()
		{
			CreateMap<RegisterCredentials, User>();
			CreateMap<User, UserProfile>();
		}
	}
}
