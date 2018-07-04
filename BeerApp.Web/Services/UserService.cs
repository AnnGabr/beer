using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using BeerApp.DataAccess.Models;

namespace BeerApp.Web.Services
{
    public class UserService : IUserService
    {
	    protected readonly UserManager<User> UserManager;

		public UserService(UserManager<User> userManager)
		{
			UserManager = userManager;
		}

	    public async Task<int?> GetCurrentUserIdAsync(ClaimsPrincipal principal)
	    {
			User user = await UserManager.GetUserAsync(principal);

			return user?.Id;
	    }

		public async Task<User> GetCurrentUserAsync(ClaimsPrincipal principal)
		{
			return await UserManager.GetUserAsync(principal);
		}

		public async Task<User> GetUserByIdAsync(string id)
		{
			return await UserManager.FindByIdAsync(id);
		}
	}
}
