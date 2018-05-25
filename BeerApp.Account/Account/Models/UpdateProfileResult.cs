using System.Collections.Generic;

namespace BeerApp.Account.Account.Models
{
    public class UpdateProfileResult
    {
	    public UserProfile Profile { get; set; }
	    public List<string> Errors { get; set; }
	}
}
