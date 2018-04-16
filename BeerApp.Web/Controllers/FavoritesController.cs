using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;

using BeerApp.PunkApi.Services.Interfaces;
using PunkApiBeer = BeerApp.PunkApi.Models.Beer.Beer;

using BeerApp.Web.Models.Beer;
using Microsoft.AspNetCore.Authorization;

namespace BeerApp.Web.Controllers
{
	[Authorize]
	[Route("[controller]")]
	public class FavoritesController : Controller
    {
		private readonly IPunkApiService punkApiService;
		private readonly IMapper mapper;

		public FavoritesController(IPunkApiService punkApiService, IMapper mapper)
	    {
		    this.punkApiService = punkApiService ?? throw new ArgumentNullException(nameof(punkApiService));
		    this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
	    }

		[HttpGet]
		public async Task<IActionResult> GetFavoriteBeersAsync([FromQuery] long userId)
		{
			long[] ids = {1, 2, 3}; //test
			IEnumerable<PunkApiBeer> punkApiBeer = await punkApiService.GetBeerByIdsAsync(ids);
			var favorites = mapper.Map<IReadOnlyList<BeerWithDescription>>(punkApiBeer);

			return new ObjectResult(favorites);
		}
	}
}
