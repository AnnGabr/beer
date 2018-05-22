using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Security.Claims;
using System.Web;
using AutoMapper;
using BeerApp.Account.Account;
using BeerApp.Account.Extensions;
using BeerApp.Account.Image.Interfaces;
using BeerApp.DataAccess.Models;
using BeerApp.Account.Models;

namespace BeerApp.Account.Services
{
	public class AccountService : IAccountService
	{
		protected readonly IMapper Mapper;
		protected readonly IVerificationEmailSender VarificationEmailSender;
		protected readonly UserManager<User> UserManager;
		protected readonly SignInManager<User> SignInManager;
		protected readonly IImageCloudService ImageCloudService;
		
		public AccountService(UserManager<User> userManager, SignInManager<User> signInManager, 
			IMapper mapper, IVerificationEmailSender varificationEmailSender, IImageCloudService imageCloudService)
		{
			Mapper = mapper;
			VarificationEmailSender = varificationEmailSender;
			UserManager = userManager;
			SignInManager = signInManager;
			ImageCloudService = imageCloudService;
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
	
		public async Task<LoginResult> LoginAsync(LoginCredentials loginCredentials)
		{
			await LogoutAsync();

			SignInResult signInResult = await SignInManager
				.PasswordSignInAsync(loginCredentials.Email, loginCredentials.Password, loginCredentials.RememberMe, false);
			if (signInResult.Succeeded)
			{
				User user = await UserManager.FindByEmailAsync(loginCredentials.Email);

				return new LoginResult() { User = Mapper.Map<UserProfile>(user) };	
			}

			return new LoginResult()
			{
				EmailIsNotConfirmed = signInResult.IsNotAllowed
			};
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

		public void UpdateProfileAsync(ClaimsPrincipal principal, ChangableProfileInfo newProfileinfo)
		{
			//TODO: update user profile info	
		}

		public async Task<bool> ConfirmEmailAsync(User user, string emailToken)
		{
			IdentityResult result = await UserManager.ConfirmEmailAsync(user, emailToken);

			return result.Succeeded;
		}
	}
}
