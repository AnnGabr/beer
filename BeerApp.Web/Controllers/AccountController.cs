using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using BeerApp.Account.Models;
using BeerApp.Account.Services;
using BeerApp.Web.Extentions.Attributes;
using BeerApp.Web.Models.User;
using BeerApp.Web.Models.Response;

namespace BeerApp.Web.Controllers
{
	[Authorize]
	public class AccountController : Controller
	{
		private readonly IAccountService accountService;

		private readonly IMapper mapper;

		public AccountController(IAccountService accountService, IMapper mapper)
		{
			this.accountService = accountService ?? throw new ArgumentNullException(nameof(accountService));

			this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
		}
		
		[HttpPost]
		[AllowAnonymous]
		[ValidateRegistrationData]
		public async Task<IActionResult> Register([FromBody] UserToRegister userToRegister) //TODO: validate? email conf
		{
			var registrationData = mapper.Map<RegistrationData>(userToRegister);

			IEnumerable<string> registrationErrors = await accountService.RegisterAsync(registrationData);
			if (registrationErrors == null)
			{
				return Ok("Registered successfully");
			}

			return BadRequest(registrationErrors);
		}

		[HttpPost]
		[AllowAnonymous]
		public async Task<IActionResult> Login([FromBody] UserToLogin userToLogin)
		{
			var loginParams = mapper.Map<LoginParams>(userToLogin);

			bool isEmailRegistered = await accountService.IsEmailRegistered(loginParams.Email);
			if (!isEmailRegistered)
			{
				return BadRequest(new BadRequestResponse("Couldn`t find account with given email."));
			}

			bool isLoginSucceeded = await accountService.LoginAsync(loginParams);
			if (isLoginSucceeded)
			{
				return NoContent();
			}

			return NotFound(new BadRequestResponse("Wrong login or password."));
		}

		[HttpGet]
		public async Task<IActionResult> Logout()
		{
			await accountService.LogoutAsync();

			return NoContent();
		}

		[HttpDelete]
		public async Task<IActionResult> Delete()
		{
			bool isDeleted = await accountService.DeleteAsync(HttpContext.User);
			if (isDeleted)
			{
				return NoContent();
			}

			return NotFound(new BadRequestResponse("Couldn`t delete account."));
		}

		[HttpGet]
		public async Task<IActionResult> Profile()
		{
			UserProfile userProfile = await accountService.GetProfileInfo(HttpContext.User);
			if (userProfile == null)
			{
				return NotFound();
			}

			return new ObjectResult(userProfile);
		}
	}
}
