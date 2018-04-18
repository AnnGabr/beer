using System.Collections.Generic;
using System.Threading.Tasks;

using BeerApp.Web.Models.Beer;

namespace BeerApp.Web.Services
{
    public interface IFavoritesService
    {
		Task<IReadOnlyList<BeerWithDescription>> GetAllAsync(long userId);
		Task RemoveAsync(long userId, long beerId);
		Task AddAsync(long userId, long beerId);
    }
}
