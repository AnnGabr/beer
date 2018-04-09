using System;
using Microsoft.AspNetCore.Mvc;

namespace BeerApp.DataAccess.Domain.Services
{
    public interface IBeerService
    {
		IActionResult Delete(Int64 id);
		IActionResult Update([FromBody] Beer beer);
		IActionResult Add([FromBody] Beer beer);
    }
}
