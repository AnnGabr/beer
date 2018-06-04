using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using AutoMapper;
using BeerApp.Account.Account.Models;
using BeerApp.Account.Extensions;
using BeerApp.Account.Helpers;
using BeerApp.Account.Image;
using BeerApp.Account.Image.Transformations;
using BeerApp.Account.Jwt.Interfaces;
using BeerApp.Account.Services;
using BeerApp.DataAccess.Models;
using Microsoft.AspNetCore.Identity;

namespace BeerApp.Account.Account
{
	public class AccountService : IAccountService
	{
		protected readonly IMapper Mapper;
		protected readonly IVerificationEmailSender VarificationEmailSender;
		protected readonly UserManager<User> UserManager;
		protected readonly SignInManager<User> SignInManager;
		protected readonly IImageCloudService ImageCloudService;
		protected readonly IJwtFactory JwtFactory;

		public AccountService(UserManager<User> userManager, SignInManager<User> signInManager, 
			IMapper mapper, IVerificationEmailSender varificationEmailSender, 
			IImageCloudService imageCloudService, IJwtFactory jwtFactory)
		{
			Mapper = mapper;
			VarificationEmailSender = varificationEmailSender;
			UserManager = userManager;
			SignInManager = signInManager;
			ImageCloudService = imageCloudService;
			JwtFactory = jwtFactory;
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

				return new LoginResult()
				{
					User = Mapper.Map<UserProfile>(user),
					Token = JwtFactory.GenerateEncodedToken(user)
				};	
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

			return Mapper.Map<UserProfile>(user);
		}

		public async Task<bool> IsEmailRegistered(string emailAddress)
		{
			User user = await UserManager.FindByEmailAsync(emailAddress);

			return user != null;
		}

		public async Task<UpdateProfileResult> UpdateProfileAsync(ClaimsPrincipal principal, ChangableProfileInfo newProfileInfo)
		{
			User user = await UserManager.GetUserAsync(principal);

			if (newProfileInfo.ProfileImage != null)
			{
				ImageUploadResponse profileImageUploadResponse = await UploadImage(newProfileInfo.ProfileImage);
				if (!profileImageUploadResponse.Succeeded)
				{
					return new UpdateProfileResult()
					{
						Errors = new List<string>() {profileImageUploadResponse.Error}
					};
				}

				user.ProfilePictureUrl = profileImageUploadResponse.ImageId;
			}

			if (newProfileInfo.BirthDate != null)
			{
				if (!Validator.IsBirthDateValid((DateTime)newProfileInfo.BirthDate))
				{
					return new UpdateProfileResult()
					{
						Errors = new List<string>() { "Invalid birth date." }
					};
				}

				user.BirthDate = newProfileInfo.BirthDate;
			}

			IdentityResult updateResult = await UserManager.UpdateAsync(user);
			if (!updateResult.Succeeded)
			{
				return new UpdateProfileResult()
				{
					Errors = new List<string>() { "Can`t update user info." }
				};
			}

			return new UpdateProfileResult()
			{
				Profile = Mapper.Map<UserProfile>(user)
			};
		}

		private async Task<ImageUploadResponse> UploadImage(string image)
		{
			return await ImageCloudService.UploadAvatarAsync(image, new AvatarTransformation());
		}

		public async Task<bool> ConfirmEmailAsync(User user, string emailToken)
		{
			IdentityResult result = await UserManager.ConfirmEmailAsync(user, emailToken);
			
			return result.Succeeded;
		}
	}
}
