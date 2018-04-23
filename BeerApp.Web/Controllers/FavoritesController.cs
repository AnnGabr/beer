using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using BeerApp.Web.Models.Beer;
using BeerApp.Web.Models.Response;
using BeerApp.Web.Services;

namespace BeerApp.Web.Controllers
{
	[Authorize]
	[Route("[controller]")]
	public class FavoritesController : Controller
    {
		private readonly IFavoritesService favoritesService;
		private readonly IUserService userService;

		public FavoritesController(IFavoritesService favoritesService, IUserService userService)
	    {
		    this.favoritesService = favoritesService ?? throw new ArgumentNullException(nameof(favoritesService));
			this.userService = userService ?? throw new ArgumentNullException(nameof(userService));
	    }

		[HttpGet]
		public async Task<IActionResult> GetFavoriteBeersAsync()
		{
			long? currentUserId = await GetCurrentUserId();
			if (currentUserId == null)
			{
				return Unauthorized();
			}

			IEnumerable<BeerWithDescription> favorites = await favoritesService.GetAllAsync((long)currentUserId);

			return new ObjectResult(favorites);
		}

	    [HttpDelete("delete")]
	    public async Task<IActionResult> RemoveFromFavorites([FromQuery] long beerId)
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

		    return BadRequest(new BadRequestResponse("Favorite doesn`t exist."));
	    }

	    [HttpPost("add")]
	    public async Task<IActionResult> AddToFavorites([FromQuery] long punkBeerId)
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

		    return BadRequest(new BadRequestResponse("Can`t add to favorites."));
	    }

		private async Task<long?> GetCurrentUserId()
		{
			return await userService.GetCurrentUserIdAsync(HttpContext.User);
		}
	}
}
