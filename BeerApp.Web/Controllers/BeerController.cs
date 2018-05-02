using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BeerApp.Web.Models.Beer;
using BeerApp.Web.Models.Search;
using BeerApp.Web.Services;

namespace BeerApp.Web.Controllers
{
	public class BeerController : Controller
	{
		private readonly IBeerService beerService;

		public BeerController(IBeerService beerService)
		{
			this.beerService = beerService;
		}

		[HttpGet]
		public async Task<IActionResult> Search([FromQuery] SearchParams searchParams)
		{
			try
			{
				IEnumerable<IBeer> searchResult = await beerService.SearchAsync(searchParams);

				return new ObjectResult(searchResult);
			}
			catch (HttpRequestException exp)
			{
				return BadRequest(exp.Message);
			}
		}

		[HttpGet]
		public async Task<IActionResult> SearchById([FromQuery] long punkBeerId)
		{
			try
			{
				IBeer beer = await beerService.SearchOneAsync(punkBeerId);

				return new ObjectResult(beer);
			}
			catch (HttpRequestException exp)
			{
				return BadRequest(exp.Message);
			}	
		}
	}
}
