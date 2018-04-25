using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using BeerApp.PunkApi.Services;
using PunkApiSearchParams = BeerApp.PunkApi.Models.Search.SearchParams;
using PunkApiBeer = BeerApp.PunkApi.Models.Beer.Beer;
using BeerApiSearchParams = BeerApp.Web.Models.Search.SearchParams;
using BeerApp.Web.Models.Beer;
using BeerApp.Web.Services;

namespace BeerApp.Web.Controllers
{
	public class BeerController : Controller
	{
		private readonly IPunkApiService punkApiService;
		private readonly IBeerService beerService;

		private readonly IMapper mapper;

		public BeerController(IPunkApiService punkApiService, IMapper mapper, IBeerService beerService)
		{
			this.punkApiService = punkApiService ?? throw new ArgumentNullException(nameof(punkApiService));
			this.beerService = beerService ?? throw new ArgumentNullException(nameof(beerService));

			this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
		}

		[HttpGet]
		public async Task<IActionResult> Search([FromQuery] BeerApiSearchParams searchParams)
		{
			try
			{
				IEnumerable<IBeer> searchResult = await GetSearchResultAsync(searchParams);

				return new ObjectResult(searchResult);
			}
			catch (HttpRequestException exp)
			{
				return BadRequest(exp.Message);
			}
		}

		private async Task<IEnumerable<BaseBeer>> GetSearchResultAsync(BeerApiSearchParams searchParams)
		{
			IEnumerable<PunkApiBeer> searchResult = await punkApiService
				.GetSearchResultAsync(mapper.Map<PunkApiSearchParams>(searchParams));

			return mapper.Map<IReadOnlyList<BaseBeer>>(searchResult);
		}

		[HttpGet]
		public async Task<IActionResult> SearchById([FromQuery] long punkBeerId)
		{
			try
			{
				IBeer beer = await beerService.Get(punkBeerId);

				return new ObjectResult(beer);
			}
			catch (HttpRequestException exp)
			{
				return BadRequest(exp.Message);
			}	
		}
	}
}
