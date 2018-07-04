using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using BeerApp.Web.Services;
using BeerApp.Web.Models.Search;

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

	    [Route("favorites/{page}")]
		[HttpGet]
		public async Task<IActionResult> GetAsync(int page) 
		{
            int currentUserId = (int) await userService.GetCurrentUserIdAsync(HttpContext.User);

            try
			{
				FavoritesPage favoritesPage = await favoritesService.GetByPageAsync(currentUserId, page);

				return new ObjectResult(favoritesPage);
			}
			catch (HttpRequestException exp)
			{
				return BadRequest(exp.Message);
			}		
		}

	    [Route("favorites/{beerId}")]
		[HttpDelete]
	    public async Task<IActionResult> DeleteAsync(int beerId)
	    {
		    int currentUserId = (int) await userService.GetCurrentUserIdAsync(HttpContext.User);

		    bool deleted = await favoritesService.RemoveAsync(currentUserId, beerId);
		    if (deleted)
		    {
			    return NoContent();
		    }

		    return BadRequest("Favorite doesn`t exist.");
	    }

		[Route("favorites/{punkBeerId}")]
	    [HttpPost]
	    public async Task<IActionResult> AddAsync(int punkBeerId)
	    {
		    int currentUserId = (int) await userService.GetCurrentUserIdAsync(HttpContext.User);

		    bool added = await favoritesService.AddAsync(currentUserId, punkBeerId);
		    if (added)
		    {
			    return NoContent();
		    }

		    return BadRequest("Can`t add to favorites.");
	    }
	}
}
