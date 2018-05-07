﻿using System.Collections.Generic;
using System.Threading.Tasks;
using BeerApp.DataAccess.Models;

namespace BeerApp.DataAccess.Repositories
{
	public interface IBeerRepository
	{
		Task<Beer> AddAsync(Beer beer);
		Task<Beer> FindFirstAsync(int punkBeerId);
		Task<IReadOnlyList<Beer>> FindAll(int[] punkBeerIds);
	}
}
