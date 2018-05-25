using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;

namespace BeerApp.Account.Jwt
{
	internal class JwtFactory
    {
		public JwtOptions Options { get; }

	    public JwtFactory(IOptions<JwtOptions> optionsAccessor)
	    {
		    Options = optionsAccessor.Value;
	    }

	    public async Task<string> GenerateEncodedToken(string userEmail, ClaimsIdentity identity)
	    {
		    var jwt = new JwtSecurityToken(
			    Options.Issuer,
			    Options.Audience,
				identity.Claims,
			    DateTime.Now.AddDays(Options.ExpirationInDays),
			    DateTime.UtcNow,
				Options.SigningCredentials);

		    string encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

		    return encodedJwt;
	    }
	}
}
