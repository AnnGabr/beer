using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using BeerApp.Web.Services;
using BeerApp.Web.Models.Search;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace BeerApp.Web.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class FavoritesController : Controller
    {
		private readonly IFavoritesService favoritesService;
		private readonly IUserService userService;

		public FavoritesController(IFavoritesService favoritesService, IUserService userService)
	    {
		    this.favoritesService = favoritesService;
			this.userService = userService;
	    }

	    [Route("favorites/{page}/{perPage}")]
		[HttpGet]
		public async Task<IActionResult> GetAsync(int page, int perPage) 
		{
            //TODO: validate perPage

            int currentUserId = (int) await userService.GetCurrentUserIdAsync(HttpContext.User);

            try
			{
				FavoritesPage favoritesPage = await favoritesService.GetByPageAsync(currentUserId, page, perPage);

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

		    return BadRequest("Can`t remove from favorites.");
	    }

		[Route("favorites/{punkBeerId}")]
	    [HttpPost]
	    public async Task<IActionResult> AddAsync(int punkBeerId)
	    {
		    int currentUserId = (int) await userService.GetCurrentUserIdAsync(HttpContext.User);

		    int? beerId = await favoritesService.AddAsync(currentUserId, punkBeerId);
		    if (beerId != null)
		    {
			    return new ObjectResult(new { id = beerId });
		    }

		    return BadRequest("Can`t add to favorites.");
	    }

		[Route("favorites/{beerId}")]
		[HttpGet]
		public async Task<IActionResult> CheckIsFavoriteAsync(int beerId)
		{
			int currentUserId = (int)await userService.GetCurrentUserIdAsync(HttpContext.User);
			var beer = await favoritesService.GetFavoriteAsync(currentUserId, beerId);

			return new ObjectResult(new IsFavoriteResult() { IsFavorite = beer != null });
		}
	}
}
