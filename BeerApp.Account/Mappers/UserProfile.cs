using AutoMapper;

using BeerApp.Account.Models;

using BeerApp.DataAccess.Models;

namespace BeerApp.Account.Mappers
{
	internal class AccountProfile : Profile
	{
		public AccountProfile()
		{
			CreateMap<RegistrationData, User>();
		}
	}
}
