﻿using System;

namespace BeerApp.Account.Models
{
    class RegisterUser
    {
		public string UserName { get; set; }
		public string Password { get; set; }
		public string Email { get; set; }
		public DateTime? BirthDate { get; set; }
		public string ProfilePictureUrl { get; set; }
	}
}
