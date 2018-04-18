using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

using BeerApp.DataAccess.Models;
using BeerApp.Account.Models;

namespace BeerApp.Account.Services
{
    internal class UserService : IUserService
    {
		private readonly UserManager<User> UserManager;
		private readonly SignInManager<User> SignInManager;

		public UserService(UserManager<User> userManager, SignInManager<User> signInManager)
		{
			UserManager = userManager;
			SignInManager = signInManager;
		}

		public async Task<bool> Register(RegisterUser registerUser)
		{
			User user = new User { }; //TODO: init user ( userName=email, nickName)

			IdentityResult registration = await UserManager.CreateAsync(user, registerUser.Password);
			if (registration.Succeeded)
			{
				await SignInManager.SignInAsync(user, false);

				return true;
			}

			return false;
		}

		public async Task<bool> Login(LoginUser loginUser)
		{
			var loginResult = 
				await SignInManager.PasswordSignInAsync(loginUser.Email, loginUser.Password, loginUser.RememberMe, true); //lockout!

			return loginResult.Succeeded;
		}

		public async Task Logout()
		{
			await SignInManager.SignOutAsync();
		}
	}
}
