using System.ComponentModel.DataAnnotations.Schema;

namespace BeerApp.DataAccess.Models
{
	[Table("Favorites")]
    public class UserFavoriteBeer
    {
		public int UserId { get; set; }
		public User User { get; set; }

		public int BeerId { get; set; }
		public Beer Beer { get; set; }
	}
}
