using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;

using BeerApp.Web.Models.Beer;
using BeerApp.Web.Services;

namespace BeerApp.Web.Controllers
{
	[Authorize]
	[Route("[controller]")]
	public class FavoritesController : Controller
    {
		private readonly IFavoritesService favoritesService;
		private readonly IUserService userService;

		private readonly IMapper mapper;

		public FavoritesController(IFavoritesService favoritesService, IMapper mapper, IUserService userService)
	    {
		    this.favoritesService = favoritesService ?? throw new ArgumentNullException(nameof(favoritesService));
			this.userService = userService ?? throw new ArgumentNullException(nameof(userService));

			this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
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

		private async Task<long?> GetCurrentUserId()
		{
			return await userService.GetCurrentUserIdAsync(HttpContext.User);
		}
	}
}
