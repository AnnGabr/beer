using System;
using System.Threading.Tasks;

using BeerApp.DataAccess.Models;
using BeerApp.DataAccess.Repositories;

namespace BeerApp.Web.Services
{
	public class BeerService : IBeerService
	{
		protected readonly BeerRepository beerRepository;

		public BeerService(BeerRepository beerRepository)
		{
			this.beerRepository = beerRepository ?? throw new ArgumentNullException(nameof(beerRepository));
		}

		public async Task<long> AddAsync(long punkBeerId)
		{
			Beer addedBeer = await beerRepository.AddAsync(new Beer { PunkBeerId = punkBeerId });
			//TODO: check existance here

			return addedBeer.BeerId;
		}
	}
}
