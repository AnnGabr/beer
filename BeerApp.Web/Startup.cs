using AutoMapper;
using BeerApp.DataAccess;
using BeerApp.PunkApi.Services;
using BeerApp.PunkApi.Services.Interfaces;
using BeerApp.Web.Mappers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

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
			services.AddMvc();
		
	        services.AddAutoMapper();

			services.AddEntityFrameworkNpgsql().AddDbContext<BeerCatalogContext>(options =>
				options.UseNpgsql(
					Configuration.GetConnectionString("BeerApiPostgreSqlConnection"), 
					b => b.MigrationsAssembly("BeerApp.DataAccess")
				)
			);

			services.AddSingleton(GlobalMapper.GetConfiguredMapper());

			services.AddTransient<IPunkApiService, PunkApiService>();
		}

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

			app.UseMvc();
		}
    }
}
