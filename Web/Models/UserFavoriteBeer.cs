using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Models
{
    public class UserFavoriteBeer
    {
		public UInt32 UserId { get; set; }
		public User User { get; set; }

		public UInt32 BeerId { get; set; }
		public Beer Beer { get; set; }
	}
}
