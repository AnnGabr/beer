using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Models
{
    public class Beer
	{
		public UInt32 BeerId { get; set; }

		public IList<UserFavoriteBeer> UserFavoriteBeers { get; set; }
	}
}
