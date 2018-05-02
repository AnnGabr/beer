﻿using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Security.Claims;
using AutoMapper;
using BeerApp.Account.Extensions;
using BeerApp.DataAccess.Models;
using BeerApp.Account.Models;
using System.Web;

namespace BeerApp.Account.Services
{
	public class AccountService : IAccountService
	{
		protected readonly IMapper Mapper;

		protected readonly IVerificationEmailSender VarificationEmailSender;

		protected readonly UserManager<User> UserManager;
		protected readonly SignInManager<User> SignInManager;
		
		public AccountService(UserManager<User> userManager, SignInManager<User> signInManager, IMapper mapper, IVerificationEmailSender varificationEmailSender)
		{
			Mapper = mapper;
			VarificationEmailSender = varificationEmailSender;
			UserManager = userManager;
			SignInManager = signInManager;
		}

		public async Task<IReadOnlyList<string>> RegisterAsync(RegisterCredentials registerCredentials, string host)
		{
			var user = Mapper.Map<User>(registerCredentials);
			user.UserName = registerCredentials.Email;

			IdentityResult registrationResult = await UserManager.CreateAsync(user, registerCredentials.Password);
			if (registrationResult.Succeeded) 
			{
				string emailVerificationCode = await UserManager.GenerateEmailConfirmationTokenAsync(user);
				string confirmationUrl = 
					$"http://{host}/account/confirm/email/{user.Id}/{HttpUtility.UrlEncode(emailVerificationCode)}";

				SendEmailResponse response = await VarificationEmailSender
					.SendUserVarificationEmailAsync(user.NickName, user.Email, confirmationUrl);
				
				return response.Errors;
			}

			return registrationResult.GetValidationErrors();
		}
	
		public async Task<SignInResult> LoginAsync(LoginCredentials loginCredentials)
		{
			await LogoutAsync();
			SignInResult loginResult = await SignInManager
				.PasswordSignInAsync(loginCredentials.Email, loginCredentials.Password, loginCredentials.RememberMe, true);
			
			return loginResult;
		}

		public async Task LogoutAsync()
		{
			await SignInManager.SignOutAsync();
		}

		public async Task<bool> DeleteAsync(ClaimsPrincipal principal)
		{
			User user = await UserManager.GetUserAsync(principal);
			if (user == null)
			{
				return false;
			}

			IdentityResult deleteResult = await UserManager.DeleteAsync(user);

			return deleteResult.Succeeded;
		}

		public async Task<UserProfile> GetProfileInfo(ClaimsPrincipal principal)
		{
			User user = await UserManager.GetUserAsync(principal);

			return user == null ? null : Mapper.Map<UserProfile>(user);
		}

		public async Task<bool> IsEmailRegistered(string emailAddress)
		{
			User user = await UserManager.FindByEmailAsync(emailAddress);

			return user != null;
		}

		public async Task<bool> ConfirmEmailAsync(User user, string emailToken)
		{
			IdentityResult result = await UserManager.ConfirmEmailAsync(user, emailToken);

			return result.Succeeded;
		}
	}
}
