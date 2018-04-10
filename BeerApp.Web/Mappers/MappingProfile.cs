using AutoMapper;

using PunkApiSearchParams = BeerApp.PunkApi.Models.Search.SearchParams;
using BeerApiSearchParams = BeerApp.Web.Models.Search.SearchParams;

namespace BeerApp.Web.Mappers
{
    public class MappingProfile : Profile
    {
	    public MappingProfile()
	    {
		    CreateMap<PunkApiSearchParams, BeerApiSearchParams>();
		    CreateMap<BeerApiSearchParams, PunkApiSearchParams>();
	    }
	}
}
