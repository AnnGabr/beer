using AutoMapper;
using PunkApiBaseBeer = BeerApp.PunkApi.Models.Beer.BaseBeer;
using PunkApiBeerWithDescription = BeerApp.PunkApi.Models.Beer.BeerWithDescription;

using BeerApiBaseBeer = BeerApp.Web.Models.Beer.BeerBase;
using BeerApiBeerWithDescription = BeerApp.Web.Models.Beer.BeerWithDescription;

namespace BeerApp.Web.Mappers.Profiles
{
    public class BeerProfile : Profile
    {
		public BeerProfile()
		{
			CreateMap<PunkApiBaseBeer, BeerApiBaseBeer>();
			CreateMap<PunkApiBeerWithDescription, BeerApiBeerWithDescription>();
		}
    }
}
