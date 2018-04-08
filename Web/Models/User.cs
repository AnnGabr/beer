using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Models
{
    public class User
    {
		public String Name { get; set; }
		public String Email { get; set; }
		public String ProfilePictureUrl { get; set; }
		public DateTime? BirthDate { get; set; }

		public ICollection<Beer> FavoriteBeers { get; set; }
	}
}
