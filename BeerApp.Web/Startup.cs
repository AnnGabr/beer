using AutoMapper;
using BeerApp.DataAccess;
using BeerApp.DataAccess.Models;
using BeerApp.PunkApi.Services;
using BeerApp.PunkApi.Services.Interfaces;
using BeerApp.Web.Mappers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

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
				config.SignIn.RequireConfirmedEmail = true;
			})
			.AddEntityFrameworkStores<BeerCatalogContext>()
			.AddDefaultTokenProviders();

			/*var skipHTTPS = Configuration.GetValue<bool>("LocalTest:skipHTTPS");
			// requires using Microsoft.AspNetCore.Mvc;
			services.Configure<MvcOptions>(options =>
			{
				// Set LocalTest:skipHTTPS to true to skip SSL requrement in 
				// debug mode. This is useful when not using Visual Studio.
				if (Environment.IsDevelopment() && !skipHTTPS)
				{
					options.Filters.Add(new RequireHttpsAttribute());
				}
			});*/

			/*services.Configure<IdentityOptions>(options =>
			{
				options.Password.RequireDigit = true;
				options.Password.RequiredLength = 8;
				options.Password.RequireNonAlphanumeric = false;
				options.Password.RequireUppercase = true;
				options.Password.RequireLowercase = false;
				options.Password.RequiredUniqueChars = 6;

				options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
				options.Lockout.MaxFailedAccessAttempts = 10;
				options.Lockout.AllowedForNewUsers = true;

				options.User.RequireUniqueEmail = true;
			});

			services.ConfigureApplicationCookie(options =>
			{
				options.Cookie.HttpOnly = true;
				options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
				options.LoginPath = "/Account/Login";
				options.AccessDeniedPath = "/Account/AccessDenied";
				options.SlidingExpiration = true;
			});*/

			services.AddSingleton(GlobalMapper.GetConfiguredMapper());

			services.AddTransient<IPunkApiService, PunkApiService>();

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
