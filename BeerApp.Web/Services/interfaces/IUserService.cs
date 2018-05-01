using BeerApp.DataAccess.Models;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BeerApp.Web.Services
{
    public interface IUserService
    {
	    Task<long?> GetCurrentUserIdAsync(ClaimsPrincipal principal);
		Task<User> GetUserByIdAsync(string id);
	}
}
