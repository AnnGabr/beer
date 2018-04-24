using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;

namespace BeerApp.Account.Extensions
{
    public static class IdentityResultExtensions
    {
	    public static IReadOnlyList<string> GetValidationErrors(this IdentityResult identityResult)
	    {
		    if (identityResult.Succeeded)
		    {
			    return null;
		    }

		    return identityResult.Errors.Select(error => error.Description)
			    .ToArray();
	    }
	}
}
