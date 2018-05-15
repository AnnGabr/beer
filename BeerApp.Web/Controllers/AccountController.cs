using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using BeerApp.Account.Account;
using BeerApp.Account.Models;
using BeerApp.Account.Services;
using BeerApp.Web.Extentions.Attributes;
using BeerApp.Web.Models.User;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;
using BeerApp.Web.Services;
using BeerApp.DataAccess.Models;

namespace BeerApp.Web.Controllers
{
	[Authorize]
	public class AccountController : Controller
	{
		private readonly IAccountService accountService;
		private readonly IUserService userService;
		private readonly IMapper mapper;

		public AccountController(IAccountService accountService, IUserService userService, IMapper mapper)
		{
			this.accountService = accountService;
			this.userService = userService;
			this.mapper = mapper;
		}

		[Route("account/register")]
		[HttpPost]
		[AllowAnonymous]
		[ValidateBody]
		public async Task<IActionResult> RegisterAsync([FromBody] UserToRegister userToRegister) 
		{
			var registerCredentials = mapper.Map<RegisterCredentials>(userToRegister);

			IEnumerable<string> registrationErrors = await accountService
				.RegisterAsync(registerCredentials, Request.Host.Value);
			if (registrationErrors == null)
			{
				return NoContent();
			}

			return BadRequest(registrationErrors);
		}

		[Route("account/login")]
		[HttpPost]
		[AllowAnonymous]
		[ValidateBody]
		public async Task<IActionResult> LoginAsync([FromBody] UserToLogin userToLogin)
		{
			var loginParams = mapper.Map<LoginCredentials>(userToLogin);
			LoginResult loginResult = await accountService.LoginAsync(loginParams);

			return new ObjectResult(loginResult);
		}

		[Route("account/logout")]
		[HttpGet]
		public async Task<IActionResult> LogoutAsync()
		{ 
			await accountService.LogoutAsync();

			return NoContent();
		}

		[Route("account/delete")]
		[HttpDelete]
		public async Task<IActionResult> DeleteAsync()
		{
			bool isDeleted = await accountService.DeleteAsync(HttpContext.User);
			if (isDeleted)
			{
				return NoContent();
			}

			return Content("Couldn`t delete account.");
		}

		[Route("account/profile")]
		[HttpGet]
		public async Task<IActionResult> GetProfileAsync()
		{
			UserProfile userProfile = await accountService.GetProfileInfo(HttpContext.User);
			if (userProfile == null)
			{
				return Unauthorized();
			}

			return new ObjectResult(userProfile);
		}

		[Route("account/confirm/email/{userId}/{emailToken}")]
		[HttpGet]
		[AllowAnonymous]
		public async Task<IActionResult> VarifyEmailAsync(string userId, string emailToken)
		{
			User user = await userService.GetUserByIdAsync(userId);
			if (user == null)
			{
				return Content("User not found.");
			}

			emailToken = emailToken.Replace("%2f", "/").Replace("%2F", "/");

			bool isConfirmed = await accountService.ConfirmEmailAsync(user, emailToken);
			if (isConfirmed)
			{
				return NoContent();
			}

			return Content("Invalid email varification token.");
		}
	}
}
