using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace BeerApp.DataAccess.Models
{
    public class User : IdentityUser<int>
    {
		public string NickName { get; set; }
		public string ProfilePictureUrl { get; set; }
		public DateTime? BirthDate { get; set; }

		public IList<UserFavoriteBeer> UserFavoriteBeers { get; set; }
	}

	public class Role : IdentityRole<int> { }
}
