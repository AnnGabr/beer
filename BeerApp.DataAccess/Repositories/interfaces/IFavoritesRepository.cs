using System.Collections.Generic;
using System.Threading.Tasks;
using BeerApp.DataAccess.Models;

namespace BeerApp.DataAccess.Repositories
{
    public interface IFavoritesRepository
    {
	    Task<UserFavoriteBeer> AddAsync(UserFavoriteBeer favorite);
	    Task<UserFavoriteBeer> RemoveAsync(UserFavoriteBeer favorite);
	    Task<IReadOnlyList<Beer>> GetRangeAsync(int userId, int start, int count);
	    Task<UserFavoriteBeer> FindAsync(int userId, int beerId);
        Task<int> GetCountAsync(int userId);
    }
}
