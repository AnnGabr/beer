using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using AutoMapper;

using BeerApp.PunkApi.Services.Interfaces;
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

		[HttpGet("Search")]
		public async Task<IActionResult> SearchBeers([FromQuery] BeerApiSearchParams searchParams)
		{
			ICollection<BaseBeer> searchResult = await GetSearchResultAsync(searchParams);

			return new ObjectResult(searchResult);
		}

		private async Task<ICollection<BaseBeer>> GetSearchResultAsync(BeerApiSearchParams searchParams)
		{
			ICollection<PunkApiBeer> searchResult = await punkApiService
				.GetSearchResultAsync(mapper.Map<PunkApiSearchParams>(searchParams));

			return mapper.Map<ICollection<BaseBeer>>(searchResult);
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetBeerByIdAsync(long id)
		{
			PunkApiBeer punkApiBeer = await punkApiService.GetBeerByIdAsync(id);
			var beerApiBeer = mapper.Map<DetailedBeer>(punkApiBeer);

			return new ObjectResult(beerApiBeer);
		}
	}
}
