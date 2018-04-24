using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

using BeerApp.Account.Models;

namespace BeerApp.Account.Services
{
    public interface IAccountService
    {
		Task<bool> LoginAsync(LoginParams loginParams);
		Task<IReadOnlyList<string>> RegisterAsync(RegistrationData registrationData);
	    Task<bool> DeleteAsync(ClaimsPrincipal principal);
		Task LogoutAsync();

	    Task<UserProfile> GetProfileInfo(ClaimsPrincipal principal);

		Task<bool> IsEmailRegistered(string emailAddress);
	}
}
