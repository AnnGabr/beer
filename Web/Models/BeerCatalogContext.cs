using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Models;

namespace Web
{
	public class BeerCatalogContext : DbContext
	{
		public DbSet<User> Users { get; set; }
		public DbSet<Beer> Beers { get; set; }
		public DbSet<UserFavoriteBeer> UserFavoriteBeers { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<UserFavoriteBeer>().HasKey(userBeer => new { userBeer.UserId, userBeer.BeerId });
		}

		public BeerCatalogContext(DbContextOptions<BeerCatalogContext> options) : base(options) { }
	}
}

