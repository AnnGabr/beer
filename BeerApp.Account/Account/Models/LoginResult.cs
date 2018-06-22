namespace BeerApp.Account.Account.Models
{
    public class LoginResult
    {
	    public UserProfile Profile { get; set; }
		public bool EmailIsNotConfirmed { get; set; }
	    public string Token { get; set; }
	}
}
