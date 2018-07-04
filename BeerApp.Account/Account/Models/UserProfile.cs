﻿using System;

namespace BeerApp.Account.Account.Models
{
    public class UserProfile
    {
	    public string NickName { get; set; }
	    public string Email { get; set; }
		public DateTime? BirthDate { get; set; }
	    public string ProfilePictureUrl { get; set; }
	}
}