using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using System;

using AutoMapper;

using BeerApp.DataAccess.Models;

using BeerApp.Account.Models;

namespace BeerApp.Account.Services
{
    internal class UserService : IUserService
    {
		private readonly IMapper Mapper;

		private readonly UserManager<User> UserManager;
		private readonly SignInManager<User> SignInManager;

		public UserService(UserManager<User> userManager, SignInManager<User> signInManager, IMapper mapper)
		{
			UserManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
			SignInManager = signInManager ?? throw new ArgumentNullException(nameof(signInManager));

			Mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
		}

		public async Task<bool> RegisterAsync(RegistrationData registrationData)
		{
			User user = Mapper.Map<User>(registrationData);

			IdentityResult registration = await UserManager.CreateAsync(user, registrationData.Password);
			if (registration.Succeeded)
			{
				await SignInManager.SignInAsync(user, false);

				return true;
			}

			return false;
		}

		public async Task<bool> LoginAsync(LoginParams loginParams)
		{
			var loginResult = await SignInManager
				.PasswordSignInAsync(loginParams.Email, loginParams.Password, loginParams.RememberMe, true); //lockout active!

			return loginResult.Succeeded;
		}

		public async Task LogoutAsync()
		{
			await SignInManager.SignOutAsync(); //is await necessary?
		}
	}
}
