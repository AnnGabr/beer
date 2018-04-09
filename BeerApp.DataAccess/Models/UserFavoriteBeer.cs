using System;

namespace BeerApp.DataAccess.Models
{
    public class UserFavoriteBeer
    {
		public Int64 UserId { get; set; }
		public User User { get; set; }

		public Int64 BeerId { get; set; }
		public Beer Beer { get; set; }
	}
}
