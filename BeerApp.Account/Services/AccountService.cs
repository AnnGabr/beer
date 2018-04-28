using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
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
		protected readonly IMapper Mapper;

		protected readonly IVarificationEmailSender VarificationEmailSender;

		protected readonly UserManager<User> UserManager;
		protected readonly SignInManager<User> SignInManager;
		
		public AccountService(UserManager<User> userManager, SignInManager<User> signInManager, IMapper mapper, IVarificationEmailSender varificationEmailSender)
		{
			Mapper = mapper;
			VarificationEmailSender = varificationEmailSender;
			UserManager = userManager;
			SignInManager = signInManager;
		}

		public async Task<IReadOnlyList<string>> RegisterAsync(RegisterCredentials registerCredentials)
		{
			var user = Mapper.Map<User>(registerCredentials);
			user.UserName = registerCredentials.Email;

			IdentityResult registrationResult = await UserManager.CreateAsync(user, registerCredentials.Password);
			if (registrationResult.Succeeded) //TODO: email confirm here
			{
				string emailVarificationCode = await UserManager.GenerateEmailConfirmationTokenAsync(user);
				//string confirmationUrl = $"{host}/account/email/{}/{}"; TODO: generate url

				SendEmailResponse response = await VarificationEmailSender.SendUserVarificationEmailAsync(new SendEmailDetails()
				{
					ToName = user.NickName,
					ToEmail = user.Email,
					FromEmail = "ann.gabrusionok@gmail.com",
					FromName = "AnnGabr",
					Subject = "Varify Your Email - Beer Catalog."
				}, "https://www.youtube.com/watch?v=iYFP26_zI98");

				return response.Errors;
			}

			return registrationResult.GetValidationErrors();
		}
	
		public async Task<SignInResult> LoginAsync(LoginCredentials loginParams)
		{
			await LogoutAsync();
			SignInResult loginResult = await SignInManager
				.PasswordSignInAsync(loginParams.Email, loginParams.Password, loginParams.RememberMe, true); //lockout active!
			
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
	}
}
