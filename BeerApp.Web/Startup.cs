using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

using BeerApp.Web.Mappers;
using BeerApp.Web.Services;

using BeerApp.DataAccess;
using BeerApp.DataAccess.Models;
using BeerApp.DataAccess.Repositories;

using BeerApp.PunkApi.Services;

using BeerApp.Account.Services;

namespace BeerApp.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IHostingEnvironment hostingEnv)
        {
            Configuration = configuration;
			Environment = hostingEnv;
        }

        public IConfiguration Configuration { get; }
		private IHostingEnvironment Environment { get; }

		public void ConfigureServices(IServiceCollection services)
        {
	        services.AddAutoMapper();

			services.AddEntityFrameworkNpgsql().AddDbContext<BeerCatalogContext>(options =>
				options.UseNpgsql(
					Configuration.GetConnectionString("BeerApiPostgreSqlConnection")
				)
			);

			services.AddIdentity<User, Role>(config => {
				//config.SignIn.RequireConfirmedEmail = true;
			})
			.AddEntityFrameworkStores<BeerCatalogContext>()
			.AddDefaultTokenProviders();

			services.Configure<IdentityOptions>(options =>
			{
				options.Password.RequiredLength = 8;
				options.Password.RequireNonAlphanumeric = false;
				options.Password.RequireUppercase = false;
				options.Password.RequiredUniqueChars = 4;

				options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
				options.Lockout.MaxFailedAccessAttempts = 10;
				options.Lockout.AllowedForNewUsers = true;

				options.User.RequireUniqueEmail = true;
			});

			services.ConfigureApplicationCookie(options =>
			{
				options.Cookie.HttpOnly = true;
				options.ExpireTimeSpan = TimeSpan.FromMinutes(1);
				options.SlidingExpiration = true;
			});

			services.AddSingleton(GlobalMapper.GetConfiguredMapper());
			
			services.AddTransient<IBeerRepository, BeerRepository>();
			services.AddTransient<IFavoritesRepository, FavoritesRepository>();

			services.AddSingleton<IPunkApiService, PunkApiService>();
			services.AddTransient<IBeerService, BeerService>();
			services.AddTransient<IFavoritesService,FavoritesService>();

			services.AddTransient<IAccountService, AccountService>();
			services.AddTransient<IUserService, UserService>();

			services.AddMvc();
		}

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

			app.UseAuthentication();

			app.UseMvc();
		}
    }
}
