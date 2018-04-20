using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using AutoMapper;
using BeerApp.Account.Models;
using BeerApp.Web.Models.User;

using BeerApp.Account.Services;

namespace BeerApp.Web.Controllers
{
	[Authorize]
	[Route("[controller]")]
	public class AccountController : Controller
	{
		private readonly IAccountService userService;

		private readonly IMapper mapper;

		public AccountController(IAccountService userService, IMapper mapper)
		{
			this.userService = userService ?? throw new ArgumentNullException(nameof(userService));

			this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
		}

		[HttpPost]
		[AllowAnonymous]
		public async Task<IActionResult> Register([FromBody] UserDto user)
		{
			var registrationData = mapper.Map<RegistrationData>(user);
			bool isRegistered = await userService.RegisterAsync(registrationData);
			if (isRegistered)
			{
				return Ok("Registered successfully");
			}

			return BadRequest("Registration failed.");
		}

		[HttpPost]
		[AllowAnonymous]
		public async Task<IActionResult> Login([FromBody] UserDto user)
		{
			return new ObjectResult("sdasd");
		}

		[HttpGet]
		public async Task<IActionResult> Logout([FromBody] UserDto user)
		{
			return new ObjectResult("sdasd");
		}

		[HttpPut]
		public async Task<IActionResult> UpdateUser([FromBody] UserDto user)
		{
			return new ObjectResult("sdasd");
		}
	}
}
