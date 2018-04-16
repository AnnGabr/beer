using System.ComponentModel.DataAnnotations.Schema;

namespace BeerApp.DataAccess.Models
{
	[Table("Favorites")]
    public class UserFavoriteBeer
    {
		public long UserId { get; set; }
		public User User { get; set; }

		public long BeerId { get; set; }
		public Beer Beer { get; set; }
	}
}
