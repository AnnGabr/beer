using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BeerApp.DataAccess.Models
{
    public class User : IdentityUser<long>
    {
		public string ProfilePictureUrl { get; set; }

		[DataType(DataType.Date)]
		public DateTime? BirthDate { get; set; }

		public IList<UserFavoriteBeer> UserFavoriteBeers { get; set; }
	}

	public class Role : IdentityRole<long>
	{
	}
}
