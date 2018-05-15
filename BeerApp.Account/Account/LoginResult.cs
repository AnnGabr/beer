using BeerApp.Account.Models;

namespace BeerApp.Account.Account
{
    public class LoginResult
    {
	    public UserProfile User { get; set; }
		public bool EmailIsNotConfirmed { get; set; }
	}
}
