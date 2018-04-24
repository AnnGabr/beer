using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using AutoMapper;
using BeerApp.Account.Extensions;
using BeerApp.DataAccess.Models;
using BeerApp.Account.Models;

namespace BeerApp.Account.Services
{
	public class AccountService : IAccountService
	{
		private readonly IMapper mapper;

		private readonly UserManager<User> userManager;
		private readonly SignInManager<User> signInManager;

		public AccountService(UserManager<User> userManager, SignInManager<User> signInManager, IMapper mapper)
		{
			this.userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
			this.signInManager = signInManager ?? throw new ArgumentNullException(nameof(signInManager));

			this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
		}

		public async Task<IReadOnlyList<string>> RegisterAsync(RegistrationData registrationData)
		{
			var user = mapper.Map<User>(registrationData);
			user.UserName = registrationData.Email;

			IdentityResult registrationResult = await userManager.CreateAsync(user, registrationData.Password);
			if (registrationResult.Succeeded) //TODO: email confirm here
			{
				await signInManager.SignInAsync(user, false);

				return null;
			}

			return registrationResult.GetValidationErrors();
		}
	
		public async Task<bool> LoginAsync(LoginParams loginParams)
		{
			SignInResult loginResult = await signInManager
				.PasswordSignInAsync(loginParams.Email, loginParams.Password, loginParams.RememberMe, true); //lockout active!

			return loginResult.Succeeded;
		}

		public async Task LogoutAsync()
		{
			await signInManager.SignOutAsync();
		}

		public async Task<bool> DeleteAsync(ClaimsPrincipal principal)
		{
			User user = await userManager.GetUserAsync(principal);
			if (user == null)
			{
				return false;
			}

			IdentityResult deleteResult = await userManager.DeleteAsync(user);

			return deleteResult.Succeeded;
		}

		public async Task<UserProfile> GetProfileInfo(ClaimsPrincipal principal)
		{
			User user = await userManager.GetUserAsync(principal);

			return user == null ? null : mapper.Map<UserProfile>(user);
		}

		public async Task<bool> IsEmailRegistered(string emailAddress)
		{
			User user = await userManager.FindByEmailAsync(emailAddress);

			return user != null;
		}
	}
}
