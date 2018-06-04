using BeerApp.DataAccess.Models;

namespace BeerApp.Account.Jwt.Interfaces
{
	public interface IJwtFactory
    {
	    string GenerateEncodedToken(User user);
    }
}
