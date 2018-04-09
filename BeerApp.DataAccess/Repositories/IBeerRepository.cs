using System;
using Microsoft.AspNetCore.Mvc;

namespace BeerApp.DataAccess.Domain.Repositories
{
    interface IBeerRepository
    {
		IActionResult Delete(Int64 id);
		IActionResult Update([FromBody] Beer beer);
		IActionResult Add([FromBody] Beer beer);
		IActionResult IsBeerExists(Int64 id);
	}
}
