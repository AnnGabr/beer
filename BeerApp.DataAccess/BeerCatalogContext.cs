using BeerApp.DataAccess.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BeerApp.DataAccess
{
	public class BeerCatalogContext : IdentityDbContext<User, Role, long>
	{
		public DbSet<Beer> Beers { get; set; }
		public DbSet<UserFavoriteBeer> UserFavoriteBeers { get; set; }

		public BeerCatalogContext(DbContextOptions<BeerCatalogContext> options) : base(options) { }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder
				.Entity<UserFavoriteBeer>()
				.HasKey(userBeer => new { userBeer.BeerId, userBeer.UserId });
				
			modelBuilder
				.Entity<Beer>()
				.HasIndex(beer => beer.PunkBeerId)
				.IsUnique();
		}
	}
}

