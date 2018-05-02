using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using BeerApp.Web.Models.Beer;
using BeerApp.Web.Services;

namespace BeerApp.Web.Controllers
{
	[Authorize]
	public class FavoritesController : Controller
    {
		private readonly IFavoritesService favoritesService;
		private readonly IUserService userService;

		public FavoritesController(IFavoritesService favoritesService, IUserService userService)
	    {
		    this.favoritesService = favoritesService;
			this.userService = userService;
	    }

		[HttpGet]
		public async Task<IActionResult> Get() 
		{
			long? currentUserId = await GetCurrentUserId();
			if (currentUserId == null)
			{
				return Unauthorized();
			}

			try
			{
				IEnumerable<IBeer> favorites = await favoritesService.GetAllAsync((long) currentUserId);

				return new ObjectResult(favorites);
			}
			catch (HttpRequestException exp)
			{
				return BadRequest(exp.Message);
			}		
		}

	    [HttpDelete]
	    public async Task<IActionResult> Delete([FromQuery] long beerId)
	    {
		    long? currentUserId = await GetCurrentUserId();
		    if (currentUserId == null)
		    {
			    return Unauthorized();
		    }

		    bool deleted = await favoritesService.RemoveAsync((long) currentUserId, beerId);
		    if (deleted)
		    {
			    return NoContent();
		    }

		    return BadRequest("Favorite doesn`t exist.");
	    }

	    [HttpPost]
	    public async Task<IActionResult> Add([FromQuery] long punkBeerId)
	    {
		    long? currentUserId = await GetCurrentUserId();
		    if (currentUserId == null)
		    {
			    return Unauthorized();
		    }

		    bool added = await favoritesService.AddAsync((long) currentUserId, punkBeerId);
		    if (added)
		    {
			    return NoContent();
		    }

		    return BadRequest("Can`t add to favorites.");
	    }

		private async Task<long?> GetCurrentUserId()
		{
			return await userService.GetCurrentUserIdAsync(HttpContext.User);
		}
	}
}
