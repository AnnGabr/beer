using System;
using Microsoft.AspNetCore.Mvc;

namespace BeerApp.DataAccess.Domain.Services
{
	public class BeerService : IBeerService
	{
		public IActionResult Add([FromBody] Beer beer)
		{
			throw new NotImplementedException();
		}

		public IActionResult Delete(Int64 id)
		{
			throw new NotImplementedException();
		}

		public IActionResult Update([FromBody] Beer beer)
		{
			throw new NotImplementedException();
		}
	}
}
