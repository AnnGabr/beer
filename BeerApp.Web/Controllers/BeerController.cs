using System;
using System.Collections.Generic;
using BeerApp.PunkApi.Models.Beer;
using BeerApp.PunkApi.Services.Interfaces;
using BeerApp.Web.Models.Search;
using BeerApp.Web.Mappers.Search;
using BeerApp.Web.Models.Beer;
using Microsoft.AspNetCore.Mvc;

namespace BeerApp.Web.Controllers
{
    public class BeerController : Controller
    {
		private readonly IPunkApiService punkApiService;

		public BeerController(IPunkApiService punkApiService)
		{
			this.punkApiService = punkApiService ?? throw new ArgumentNullException(nameof(punkApiService));
		}

		[HttpGet("{page}")]
		public IActionResult SearchBeers([FromBody] SearchParams searchParams)
		{
			ICollection<BaseBeer> searcheBeers = punkApiService.GetSearchResult(SearchParamsMapper.Map(searchParams));

			return new ObjectResult(searcheBeers);
		}

		[HttpPost]
		public IActionResult Add([FromBody] BeerBase beerItem)
		{
			if (beerItem == null)
			{
				return BadRequest();
			}

			return new NoContentResult();
		}

		/*[HttpPut("{id}")]
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
