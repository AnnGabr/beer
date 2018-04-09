using System;
using Microsoft.AspNetCore.Mvc;

namespace BeerApp.DataAccess.Domain.Services
{
    public interface IUserFavoriteBeerService
    {
		IActionResult Delete(Int64 beerId);
		IActionResult Add(Int64 beerId);
    }
}
