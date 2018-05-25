namespace BeerApp.Account.Account.Models
{
    public class LoginResult
    {
	    public UserProfile User { get; set; }
		public bool EmailIsNotConfirmed { get; set; }
	}
}
