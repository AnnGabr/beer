using System.Collections.Generic;
using System.Threading.Tasks;
using BeerApp.Web.Models.Beer;

namespace BeerApp.Web.Services
{
    public interface IFavoritesService
    {
		Task<IReadOnlyList<BeerWithDescription>> GetAllAsync(int userId);
		Task<bool> RemoveAsync(int userId, int beerId);
		Task<bool> AddAsync(int userId, int punkApiBeerId);
    }
}
