using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BeerApp.DataAccess.Models
{
    public class User
    {
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public long UserId { get; set; }

		[Required]
		public string Name { get; set; }

		[Required]
		public string Email { get; set; }
		public string ProfilePictureUrl { get; set; }
		public DateTime? BirthDate { get; set; }

		public IList<UserFavoriteBeer> UserFavoriteBeers { get; set; }
	}
}
