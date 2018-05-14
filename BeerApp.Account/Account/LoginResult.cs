using System;
using BeerApp.Account.Models;

namespace BeerApp.Account.Account
{
    public class LoginResult
    {
	    public UserProfile User { get; set; }
		public Boolean EmailIsNotConfirmed { get; set; }
	}
}
