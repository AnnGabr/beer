using System.Threading.Tasks;
using BeerApp.DataAccess.Models;

namespace BeerApp.DataAccess.Repositories
{
	public interface IBeerRepository
	{
		Task<Beer> AddAsync(Beer beer);
		Task<Beer> FindFirstAsync(long punkBeerId);
	}
}
