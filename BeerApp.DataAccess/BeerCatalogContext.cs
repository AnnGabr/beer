using BeerApp.DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace BeerApp.DataAccess
{
	public class BeerCatalogContext : DbContext
	{
		public DbSet<User> Users { get; set; }
		public DbSet<Beer> Beers { get; set; }
		public DbSet<UserFavoriteBeer> UserFavoriteBeers { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder
				.Entity<UserFavoriteBeer>()
				.HasKey(userBeer => new { userBeer.UserId, userBeer.BeerId });

			modelBuilder
				.Entity<Beer>()
				.HasIndex(b => b.PunkBeerId)
				.IsUnique();
		}

		public BeerCatalogContext(DbContextOptions<BeerCatalogContext> options) : base(options) { }
	}
}

