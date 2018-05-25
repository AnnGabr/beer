using System;
using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using AutoMapper;
using BeerApp.Account.Account;
using BeerApp.Account.Image;
using BeerApp.Account.Jwt;
using BeerApp.Web.Mappers;
using BeerApp.Web.Services;
using BeerApp.DataAccess;
using BeerApp.DataAccess.Models;
using BeerApp.DataAccess.Repositories;
using BeerApp.PunkApi.Services;
using BeerApp.Account.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

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
	        ConfigureJwt(services);
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

				options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
			    options.Lockout.MaxFailedAccessAttempts = 10;
			    options.Lockout.AllowedForNewUsers = true;

			    options.User.RequireUniqueEmail = true;
		    });
		}

	    private void ConfigureJwt(IServiceCollection services)
	    {
		    services.Configure<JwtOptions>(options =>
		    {
			    options.Issuer = Configuration["Jwt:Issuer"];
			    options.Audience = Configuration["Jwt:Issuer"];
			    options.ExpirationInDays = int.Parse(Configuration["Jwt:JwtExpireDays"]);
			    options.SigningCredentials = new SigningCredentials(
					new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"])),SecurityAlgorithms.HmacSha256);
		    });

		    var tokenValidationParameters = new TokenValidationParameters
		    {
				ValidateIssuer = true,
			    ValidateAudience = true,
			    ValidateLifetime = true,
			    ValidateIssuerSigningKey = true,

				ValidIssuer = Configuration["Jwt:Issuer"],
				ValidAudience = Configuration["Jwt:Issuer"],
			    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"])),
				ClockSkew = TimeSpan.Zero //TODO:what does it do
		    };

		    services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
				.AddJwtBearer(cfg =>
				{
					cfg.ClaimsIssuer = Configuration["Jwt:Issuer"];
					cfg.TokenValidationParameters = tokenValidationParameters;
					cfg.SaveToken = true;
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

	    private void ConfigureImageService(IServiceCollection services)
		{
			services.Configure<CloudinaryOptions>(options => {
				options.CloudName = Configuration["CloundinarySecrets:CloudName"];
				options.ApiKey = Configuration["CloundinarySecrets:ApiKey"];
				options.ApiSecret = Configuration["CloundinarySecrets:ApiSecret"];
			});

			services.AddTransient<IImageCloudService, CloudinaryService>();	
		}

	    private void ConfigureEmailService(IServiceCollection services)
	    {
		    services.Configure<SendGridOptions>(options => {
			    options.SendGridKey = Configuration["SendGridKey"];
		    });

			services.AddTransient<IEmailSender, SendGridEmailSender>();

			services.Configure<VerificationEmailOptions>(options => {
				options.FromEmail = Configuration["VarificationEmailDetails:FromEmail"];
				options.FromName = Configuration["VarificationEmailDetails:FromName"];
				options.Subject = Configuration["VarificationEmailDetails:Subject"];
			});

		    services.AddTransient<IVerificationEmailSender, VerificationEmailSender>();
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
