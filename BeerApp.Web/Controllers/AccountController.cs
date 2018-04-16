using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

using BeerApp.Web.Models.User;

namespace BeerApp.Web.Controllers
{
	[Authorize]
	[Route("[controller]")]
	public class AccountController : Controller
    {
		[HttpPost]
		[AllowAnonymous]
		public async Task<IActionResult> Register([FromBody] UserDto user)
		{
			return new ObjectResult("sdasd");
		}
    }
}
