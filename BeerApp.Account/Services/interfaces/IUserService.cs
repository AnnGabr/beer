using System.Threading.Tasks;

using BeerApp.Account.Models;

namespace BeerApp.Account.Services
{
    public interface IUserService
    {
		Task<bool> LoginAsync(LoginParams loginParams);
		Task<bool> RegisterAsync(RegistrationData registrationData);
		Task LogoutAsync();
    }
}
