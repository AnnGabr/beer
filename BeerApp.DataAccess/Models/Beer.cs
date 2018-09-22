using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BeerApp.DataAccess.Models
{
    public class Beer
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int BeerId { get; set; }

		[Required]
		public int PunkBeerId { get; set; }

		public IList<UserFavoriteBeer> UserFavoriteBeers { get; set; }
	}
}
