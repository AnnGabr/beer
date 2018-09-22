using Microsoft.IdentityModel.Tokens;

namespace BeerApp.Account.Jwt
{
	public class JwtOptions
    {
	    public string Issuer { get; set; }
	    public string Audience { get; set; }
	    public SigningCredentials SigningCredentials { get; set; }
	    public int ExpirationInDays { get; set; }
    }
}
