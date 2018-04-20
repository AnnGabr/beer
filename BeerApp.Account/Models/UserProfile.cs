using System;
using System.Collections.Generic;
using System.Text;

namespace BeerApp.Account.Models
{
    public class UserProfile
    {
	    public string NickName { get; set; }
	    public string Email { get; set; }
	    public DateTime? BirthDate { get; set; }
	    public string ProfilePictureUrl { get; set; }
	}
}
