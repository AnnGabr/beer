﻿using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using System;

using AutoMapper;

using BeerApp.DataAccess.Models;

using BeerApp.Account.Models;

namespace BeerApp.Account.Services
{
	internal class AccountService : IAccountService
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

		public async Task<bool> RegisterAsync(RegistrationData registrationData)
		{
			var user = mapper.Map<User>(registrationData);

			IdentityResult registration = await userManager.CreateAsync(user, registrationData.Password);
			if (registration.Succeeded)
			{
				await signInManager.SignInAsync(user, false);

				return true;
			}

			return false;
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

		public async Task<bool> DeleteAsync(long id)
		{
			User user = await userManager.FindByIdAsync(id.ToString());
			if (user == null)
			{
				return true;
			}

			IdentityResult deleteResult = await userManager.DeleteAsync(user);

			return deleteResult.Succeeded;
		}

		public Task<bool> ValidatePasswordAsync(string password)
		{
			/*var isValid = await userManager.PasswordValidators.ValidateAsync("pass");

			return isValid;*/
		}
	}
}
