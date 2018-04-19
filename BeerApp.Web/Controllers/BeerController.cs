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

namespace BeerApp.Web.Controllers
{
	[Route("[controller]")]
	public class BeerController : Controller
	{
		private readonly IPunkApiService punkApiService;
		private readonly IMapper mapper;

		public BeerController(IPunkApiService punkApiService, IMapper mapper)
		{
			this.punkApiService = punkApiService ?? throw new ArgumentNullException(nameof(punkApiService));
			this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
		}

		[HttpGet("search")]
		public async Task<IActionResult> SearchBeers([FromQuery] BeerApiSearchParams searchParams)
		{
			try
			{
				IEnumerable<BaseBeer> searchResult = await GetSearchResultAsync(searchParams);

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

		[HttpGet("{id}")]
		public async Task<IActionResult> GetBeerByIdAsync(long id)
		{
			try
			{
				PunkApiBeer punkApiBeer = await punkApiService.GetBeerByIdAsync(id);
				var beerApiBeer = mapper.Map<DetailedBeer>(punkApiBeer);

				return new ObjectResult(beerApiBeer);
			}
			catch (HttpRequestException exp)
			{
				return BadRequest(exp.Message);
			}	
		}
	}
}
