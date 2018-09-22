using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using BeerApp.Account.Jwt.Interfaces;
using BeerApp.DataAccess.Models;
using Microsoft.Extensions.Options;

namespace BeerApp.Account.Jwt
{
	public class JwtFactory : IJwtFactory
    {
		public JwtOptions Options { get; }

	    public JwtFactory(IOptions<JwtOptions> optionsAccessor)
	    {
		    Options = optionsAccessor.Value;
	    }

	    public string GenerateEncodedToken(User user)
	    {
			var claims = new[]
		    {
			    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
				new Claim(JwtRegisteredClaimNames.Email, user.Email)
			};

		    var jwt = new JwtSecurityToken(
			    Options.Issuer,
			    Options.Audience,
				claims,
			    DateTime.UtcNow,
				DateTime.Now.AddDays(Options.ExpirationInDays),			    
				Options.SigningCredentials);

		    string encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

		    return encodedJwt;
	    }
	}
}
