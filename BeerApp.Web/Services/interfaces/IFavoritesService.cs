using BeerApp.Web.Models.Search;
using System.Threading.Tasks;

namespace BeerApp.Web.Services
{
    public interface IFavoritesService
    {
		Task<FavoritesPage> GetByPageAsync(int userId, int page);
		Task<bool> RemoveAsync(int userId, int beerId);
		Task<bool> AddAsync(int userId, int punkApiBeerId);
    }
}
