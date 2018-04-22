using System;
using System.Threading.Tasks;

using BeerApp.DataAccess.Models;
using BeerApp.DataAccess.Repositories;

namespace BeerApp.Web.Services
{
	public class BeerService : IBeerService
	{
		protected readonly IBeerRepository BeerRepository;

		public BeerService(IBeerRepository beerRepository)
		{
			BeerRepository = beerRepository ?? throw new ArgumentNullException(nameof(beerRepository));
		}

		public async Task<Beer> AddAsync(long punkBeerId)
		{
			Beer addedBeer = await BeerRepository.AddAsync(new Beer { PunkBeerId = punkBeerId });

			return addedBeer;
		}

		public async Task<bool> IsBeerExistAsync(long punkBeerId)
		{
			Beer isBeerExist = await FindFirstAsync(punkBeerId);

			return isBeerExist != null;
		}

		public async Task<Beer> FindFirstAsync(long punkBeerId)
		{
			Beer foundBeer = await BeerRepository.FindFirstAsync(punkBeerId);

			return foundBeer;
		}
	}
}
