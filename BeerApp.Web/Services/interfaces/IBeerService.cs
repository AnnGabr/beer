using System.Threading.Tasks;

using BeerApp.DataAccess.Models;

namespace BeerApp.Web.Services
{
    public interface IBeerService
    {
		Task<long> AddAsync(long punkBeerId);
    }
}
