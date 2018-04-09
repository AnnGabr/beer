using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [Route("[controller]")]
    public class BeerController : Controller
    {
		private readonly IBeerService beerService;

		private readonly BeerCatalogContext beerCatalogContext;

		public BeerController(BeerCatalogContext context, IBeerService beerService)
		{
			this.beerService = beerService ?? throw new ArgumentNullException(nameof(beerService));

			beerCatalogContext = context;
		}

		[HttpGet("page={page}")]
		public IActionResult SearchBeers(Int64 page)
		{
			return new NoContentResult();
		}

		[HttpPost]
		public IActionResult Add([FromBody] Beer beerItem)
		{
			if (beerItem == null)
			{
				return BadRequest();
			}

			beerCatalogContext.Beers.Add(beerItem);
			beerCatalogContext.SaveChanges();

			return new NoContentResult();
		}

		[HttpPut("{id}")]
        public IActionResult Update(Int64 beerId, [FromBody] Beer beerItem)
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
			var beer = beerCatalogContext.Beers.FirstOrDefault(b => b.BeerId == beerId);
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
		}
    }
}
