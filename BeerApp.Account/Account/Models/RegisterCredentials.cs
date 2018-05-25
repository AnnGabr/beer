using System;

namespace BeerApp.Account.Account.Models
{
    public class RegisterCredentials
    {
		public string NickName { get; set; }
		public string Password { get; set; }
		public string Email { get; set; }
		public DateTime? BirthDate { get; set; }
	}
}
