using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using BeerApp.Account.Models;
using BeerApp.DataAccess.Models;
using Microsoft.AspNetCore.Identity;

namespace BeerApp.Account.Services
{
    public interface IAccountService
    {
		Task<SignInResult> LoginAsync(LoginCredentials loginParams);
		Task<IReadOnlyList<string>> RegisterAsync(RegisterCredentials registerCredentials, string host);
	    Task<bool> DeleteAsync(ClaimsPrincipal principal);
		Task LogoutAsync();
	    Task<UserProfile> GetProfileInfo(ClaimsPrincipal principal);
		Task<bool> IsEmailRegistered(string emailAddress);
		Task<bool> ConfirmEmailAsync(User user, string emailToken);
	}
}
