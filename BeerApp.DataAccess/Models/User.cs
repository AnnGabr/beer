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
		public Int64 UserId { get; set; }

		[Required]
		public String Name { get; set; }

		[Required]
		public String Email { get; set; }
		public String ProfilePictureUrl { get; set; }
		public DateTime? BirthDate { get; set; }

		public IList<UserFavoriteBeer> UserFavoriteBeers { get; set; }
	}
}
