using System.Collections.Generic;
using System.Threading.Tasks;
using BeerApp.DataAccess.Models;

namespace BeerApp.DataAccess.Repositories
{
	public interface IBeerRepository
	{
		Task<Beer> AddAsync(Beer beer);
		Task<Beer> FindFirstAsync(long punkBeerId);
		Task<IReadOnlyList<Beer>> FindAll(long[] punkBeerIds);
	}
}
