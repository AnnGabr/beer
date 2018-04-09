using System;
using Microsoft.AspNetCore.Mvc;

namespace BeerApp.DataAccess.Domain.Services
{
    public interface IUserService
    {
		IActionResult Add([FromBody] User user);
		IActionResult Update([FromBody] User user);
		IActionResult Delete(Int64 userId);
		IActionResult GetById(Int64 userId);
	}
}
