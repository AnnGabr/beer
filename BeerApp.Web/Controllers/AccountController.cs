using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using AutoMapper;

using BeerApp.Account.Models;
using BeerApp.Account.Services;

using BeerApp.Web.Models.User;
using BeerApp.Web.Models.Response;
using BeerApp.Web.Services;
using BeerApp.Web.Extentions.Attributes;

namespace BeerApp.Web.Controllers
{
	[Authorize]
	[Route("[controller]")]
	public class AccountController : Controller
	{
		private readonly IAccountService accountService;
		private readonly IUserService userService;

		private readonly IMapper mapper;

		public AccountController(IAccountService accountService, IUserService userService, IMapper mapper)
		{
			this.accountService = accountService ?? throw new ArgumentNullException(nameof(accountService));
			this.userService = userService ?? throw new ArgumentNullException(nameof(userService));

			this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
		}
		
		[HttpPost]
		[AllowAnonymous]
		//[ValidateRegistrationData]
		public async Task<IActionResult> Register([FromBody] RegisterUser registrationUser) //TODO: validate?
		{
			var registrationData = mapper.Map<RegistrationData>(registrationUser);

			bool isRegistered = await accountService.RegisterAsync(registrationData);
			if (isRegistered)
			{
				return Ok("Registered successfully");
			}

			return BadRequest("Registration failed.");
		}

		[HttpPost]
		[AllowAnonymous]
		public async Task<IActionResult> Login([FromBody] LoginUser loginUser)
		{
			var loginParams = mapper.Map<LoginParams>(loginUser);

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

			return BadRequest(new BadRequestResponse("Wrong login or password."));
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
			long? currentUserId = await GetCurrenUserIdAsync();
			if (currentUserId == null)
			{
				return Unauthorized();
			}

			bool isDeleted = await accountService.DeleteAsync((long)currentUserId);
			if (isDeleted)
			{
				return NoContent();
			}

			return BadRequest(new BadRequestResponse("Couldn`t delete account."));
		}

		private async Task<long?> GetCurrenUserIdAsync() 
		{
			return await userService.GetCurrentUserIdAsync(HttpContext.User);
		}
	}
}
