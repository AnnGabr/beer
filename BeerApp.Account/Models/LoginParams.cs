﻿namespace BeerApp.Account.Models
{
    public class LoginParams
    {
		public string Password { get; set; }
		public string Email { get; set; }
		public bool RememberMe { get; set; }
	}
}
