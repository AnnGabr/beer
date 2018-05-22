using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using AutoMapper;
using BeerApp.Account.Image.CloudinaryCloud;
using BeerApp.Account.Image.Interfaces;
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
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

		public void ConfigureServices(IServiceCollection services)
        {
	        ConfigureMapper(services);
			ConfigureDbConnection(services);
			ConfigureIdentity(services);
			ConfigureCookie(services);
			ConfigureCustomServices(services);
			ConfigureMvc(services);
		}

		private void ConfigureMapper(IServiceCollection services)
	    {
			services.AddAutoMapper();
		}

	    private void ConfigureDbConnection(IServiceCollection services)
	    {
			services.AddEntityFrameworkNpgsql().AddDbContext<BeerCatalogContext>(options =>
				options.UseNpgsql(
					Configuration.GetConnectionString("BeerApiPostgreSqlConnection")
				)
			);
		}

	    private void ConfigureIdentity(IServiceCollection services)
	    {
			services.AddIdentity<User, Role>(config => {
				 config.SignIn.RequireConfirmedEmail = true; 
			})
			    .AddEntityFrameworkStores<BeerCatalogContext>()
			    .AddDefaultTokenProviders();

		    services.Configure<IdentityOptions>(options =>
		    {
			    options.Password.RequiredLength = 6;
			    options.Password.RequireNonAlphanumeric = false;
			    options.Password.RequireUppercase = false;
			    options.Password.RequiredUniqueChars = 3;
			    options.Password.RequireLowercase = true;

				options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
			    options.Lockout.MaxFailedAccessAttempts = 10;
			    options.Lockout.AllowedForNewUsers = true;

			    options.User.RequireUniqueEmail = true;
		    });
		}

	    private void ConfigureCookie(IServiceCollection services)
	    {
		    Func<RedirectContext<CookieAuthenticationOptions>, Task> ReplaceRedirector(HttpStatusCode statusCode, Func<RedirectContext<CookieAuthenticationOptions>, Task> existingRedirector) =>
			    context => {
					context.Response.StatusCode = (int)statusCode;
					return Task.CompletedTask;
			    };

			services.ConfigureApplicationCookie(options =>
			{
				options.Cookie.HttpOnly = true;
				options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
				options.SlidingExpiration = true;

				options.Events.OnRedirectToAccessDenied = ReplaceRedirector(HttpStatusCode.Forbidden, options.Events.OnRedirectToAccessDenied);
				options.Events.OnRedirectToLogin = ReplaceRedirector(HttpStatusCode.Unauthorized, options.Events.OnRedirectToLogin);
			});
		}

	    private void ConfigureCustomServices(IServiceCollection services)
	    {
			services.AddSingleton(GlobalMapper.GetConfiguredMapper());

		    services.AddScoped<IBeerRepository, BeerRepository>();
		    services.AddScoped<IFavoritesRepository, FavoritesRepository>();

		    services.AddSingleton<IPunkApiService, PunkApiService>();
		    services.AddTransient<IBeerService, BeerService>();
		    services.AddTransient<IFavoritesService, FavoritesService>();

			ConfigureEmailService(services);		

			services.AddTransient<IAccountService, AccountService>();
		    services.AddTransient<IUserService, UserService>();

		    ConfigureImageService(services);
	    }

	    private void ConfigureEmailService(IServiceCollection services)
		{
			services.AddTransient<IImageCloudService, CloudinaryService>();

			services.Configure<CloudinaryOptions>(options => {
				options.CloudName = Configuration["CloundinarySecrets:CloudName"];
				options.ApiKey = Configuration["CloundinarySecrets:ApiKey"];
				options.ApiSecret = Configuration["CloundinarySecrets:ApiSecret"];
			});
		}

	    private void ConfigureImageService(IServiceCollection services)
	    {
			services.AddTransient<IEmailSender, SendGridEmailSender>();

		    services.Configure<SendGridOptions>(options => {
			    options.SendGridKey = Configuration["SendGridKey"];
		    });

		    services.AddTransient<IVerificationEmailSender, VerificationEmailSender>();

		    services.Configure<VerificationEmailOptions>(options => {
			    options.FromEmail = Configuration["VarificationEmailDetails:FromEmail"];
			    options.FromName = Configuration["VarificationEmailDetails:FromName"];
			    options.Subject = Configuration["VarificationEmailDetails:Subject"];
		    });
		}

		private void ConfigureMvc(IServiceCollection services)
		{
			services.AddMvc();
		}

		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

			app.UseAuthentication();

			app.UseMvc(routes =>
			{
				routes.MapRoute("default", "{controller=Beer}/{action=Search}/{id?}");
			});
		}
    }
}
