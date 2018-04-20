using System.Security.Claims;
using System.Threading.Tasks;

namespace BeerApp.Web.Services
{
    public interface IUserService
    {
	    Task<long> GetCurrentUserIdAsync(ClaimsPrincipal principal);
    }
}
