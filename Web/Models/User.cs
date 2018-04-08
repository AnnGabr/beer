using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Models
{
    public class User
    {
		public UInt32 UserId { get; set; }
		[Required]
		public String Name { get; set; }
		[Required]
		public String Email { get; set; }
		public String ProfilePictureUrl { get; set; }
		public DateTime? BirthDate { get; set; }

		public IList<UserFavoriteBeer> UserFavoriteBeers { get; set; }
	}
}
