using System.Threading.Tasks;
using BeerApp.DataAccess.Models;

namespace BeerApp.Web.Services
{
    public interface IBeerService
    {
		Task<Beer> AddAsync(long punkBeerId);
	    Task<bool> IsBeerExistAsync(long punkBeerId);
	    Task<Beer> FindFirstAsync(long punkBeerId);
	}
}
