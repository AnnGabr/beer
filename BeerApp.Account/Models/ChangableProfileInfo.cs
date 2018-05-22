using System;
using System.IO;

namespace BeerApp.Account.Models
{
    public class ChangableProfileInfo
    {
	    public Stream ProfileImage { get; set; }
	    public DateTime? BirthDate { get; set; }
    }
}
