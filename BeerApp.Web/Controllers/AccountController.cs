using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using BeerApp.Web.Models.User;

using BeerApp.Account.Services;

namespace BeerApp.Web.Controllers
{
	[Authorize]
	[Route("[controller]")]
	public class AccountController : Controller
	{
		private readonly IUserService UserService;

		public AccountController(IUserService userService)
		{
			UserService = userService;
		}

		[HttpPost]
		[AllowAnonymous]
		public async Task<IActionResult> Register([FromBody] UserDto user)
		{
			return new ObjectResult("sdasd");
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
