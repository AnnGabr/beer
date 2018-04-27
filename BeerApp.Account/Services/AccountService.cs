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

		protected readonly UserManager<User> UserManager;
		protected readonly SignInManager<User> SignInManager;

		public AccountService(UserManager<User> userManager, SignInManager<User> signInManager, IMapper mapper)
		{
			UserManager = userManager;
			SignInManager = signInManager;

			Mapper = mapper;
		}

		public async Task<IReadOnlyList<string>> RegisterAsync(RegistrationData registrationData)
		{
			var user = Mapper.Map<User>(registrationData);
			user.UserName = registrationData.Email;

			IdentityResult registrationResult = await UserManager.CreateAsync(user, registrationData.Password);
			if (registrationResult.Succeeded) //TODO: email confirm here
			{
				/*IMailSender mailSender = new SendgridMailSender();
				await mailSender.Send();*/

				return null;
			}

			return registrationResult.GetValidationErrors();
		}
	
		public async Task<SignInResult> LoginAsync(LoginParams loginParams)
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
