using AutoMapper;
using BeerApp.Web.Models.Beer;
using PunkApiBeer = BeerApp.PunkApi.Models.Beer.Beer;
using PunkApiBeerIngredients = BeerApp.PunkApi.Models.Beer.Ingredients;

using BaseBeer = BeerApp.Web.Models.Beer.BeerBase;
using BeerWithDescription = BeerApp.Web.Models.Beer.BeerWithDescription;
using DetailedBeer = BeerApp.Web.Models.Beer.DetailedBeer;
using BeerApiBeerIngredients = BeerApp.Web.Models.Beer.Ingredients;

namespace BeerApp.Web.Mappers.Profiles
{
    public class BeerProfile : Profile
    {
		public BeerProfile()
		{
			CreateMap<PunkApiBeerIngredients, BeerApiBeerIngredients>();

			CreateMap<PunkApiBeer, BaseBeer>();
			CreateMap<PunkApiBeer, BeerWithDescription>();			
			CreateMap<PunkApiBeer, DetailedBeer>()
				.ForMember(
					detailedBeer => detailedBeer.Properties,
					opts => opts.MapFrom(
						punkApiBeer => new Properties
						{
							Abv = punkApiBeer.Abv,
							Ibu = punkApiBeer.Ibu,
							Ebc = punkApiBeer.Ebc
						}
					)
				)
				.AfterMap(
					(punkApiBeer, detailedBeer) =>
					{
						detailedBeer.Ingredients = detailedBeer.Ingredients ?? new Ingredients();
						detailedBeer.Ingredients.Water = new ValueInUnit {
							Value = punkApiBeer.BoilVolume.Value,
							Unit = punkApiBeer.BoilVolume.Unit
						};
					}
				);
		}
    }
}
