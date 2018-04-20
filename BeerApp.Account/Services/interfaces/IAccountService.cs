using System.Threading.Tasks;

using BeerApp.Account.Models;

namespace BeerApp.Account.Services
{
    public interface IAccountService
    {
		Task<bool> LoginAsync(LoginParams loginParams);
		Task<bool> RegisterAsync(RegistrationData registrationData);
	    Task<bool> DeleteAsync(long userId);
		Task LogoutAsync();

	    Task<bool> ValidatePasswordAsync(string password);
    }
}
