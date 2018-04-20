using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

using BeerApp.DataAccess.Models;

namespace BeerApp.Web.Services
{
    internal class UserService : IUserService
    {
	    protected readonly UserManager<User> UserManager;

		public UserService(UserManager<User> userManager)
		{
			this.UserManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
		}

	    public async Task<long> GetCurrentUserIdAsync(ClaimsPrincipal principal)
	    {
		    return (await UserManager.GetUserAsync(principal)).Id;
	    }
    }
}
