using System.Collections.Generic;
using BeerApp.Account.Models;

namespace BeerApp.Account.Account
{
    public class UpdateProfileResult
    {
	    public UserProfile Profile { get; set; }
	    public List<string> Errors { get; set; }
		public bool Succeeded
		{
			get => !(Errors?.Count > 0);
		}
	}
}
