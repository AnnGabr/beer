using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using AutoMapper;

using BeerApp.PunkApi.Services.Interfaces;
using PunkApiSearchParams = BeerApp.PunkApi.Models.Search.SearchParams;
using PunkApiBaseBeer = BeerApp.PunkApi.Models.Beer.BaseBeer;
using PunkApiDetailedBeer = BeerApp.PunkApi.Models.Beer.DetailedBeer.DetailedBeer;

using BeerApiSearchParams = BeerApp.Web.Models.Search.SearchParams;
using BeerApiBaseBeer = BeerApp.Web.Models.Beer.BeerBase;
using BeerApiDetailedBeer = BeerApp.Web.Models.Beer.DetailedBeer;

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
			ICollection<BeerApiBaseBeer> searchResult = await GetSearchResult(searchParams);

			return new ObjectResult(searchResult);
		}

		private async Task<ICollection<BeerApiBaseBeer>> GetSearchResult(BeerApiSearchParams searchParams)
		{
			ICollection<PunkApiBaseBeer> searchResult = await punkApiService
				.GetSearchResultAsync(mapper.Map<PunkApiSearchParams>(searchParams));

			return mapper.Map<ICollection<BeerApiBaseBeer>>(searchResult);
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetBeerByIdAsync(long id)
		{
			PunkApiDetailedBeer punkApiBeer = await punkApiService.GetBeerByIdAsync(id);
			//var beerApiBeer = mapper.Map<BeerApiDetailedBeer>(punkApiBeer);

			return new ObjectResult(punkApiBeer);
		}

		/*[HttpPost]
		public IActionResult Add([FromBody] BeerBase beerItem)
		{
			if (beerItem == null)
			{
				return BadRequest();
			}

			return new NoContentResult();
		}

		[HttpPut("{id}")]
        public IActionResult Update(Int64 beerId, [FromBody] BeerBase beerItem)
        {
			if (beerItem == null || beerItem.BeerId != beerId)
			{
				return BadRequest();
			}

			var beer = beerCatalogContext.Beers.FirstOrDefault(b => b.BeerId == beerId);
			if (beer == null)
			{
				return NotFound();
			}

			//TODO: some update

			return new NoContentResult();
		}

        [HttpDelete("{id}")]
        public IActionResult Delete(Int64 beerId)
        {
			var beer = beerCatalogContext.Beers.FirstOrDefault(b => b.BeerId == beerId);
			if (beer == null)
			{
				return NotFound();
			}

			beerCatalogContext.Beers.Remove(beer);
			beerCatalogContext.SaveChanges();

			return new NoContentResult();
		}

		[HttpGet("{id}")]
		public IActionResult GetById(Int64 beerId)
		{
			/*var beer = beerCatalogContext.Beers.FirstOrDefault(b => b.BeerId == beerId);
			if (beer == null)
			{
				return NotFound();
			}

			return new ObjectResult(beer);
		}

		public Boolean IsBeerExists(Int64 beerId)
		{
			Beer beer = beerCatalogContext.Beers.FirstOrDefault(b => b.BeerId == beerId);

			return beer != null;
		}*/
	}
}
