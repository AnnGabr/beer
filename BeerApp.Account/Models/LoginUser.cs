using System;
using System.Collections.Generic;
using System.Text;

namespace BeerApp.Account.Models
{
    class LoginUser
    {
		public string Password { get; set; }
		public string Email { get; set; }

		public bool RememberMe { get; set; }
	}
}
