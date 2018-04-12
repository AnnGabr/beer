using AutoMapper;
using PunkApiSearchParams = BeerApp.PunkApi.Models.Search.SearchParams;
using BeerApiSearchParams = BeerApp.Web.Models.Search.SearchParams;

namespace BeerApp.Web.Mappers.Profiles
{
    public class SearchProfile : Profile
    {
	    public SearchProfile()
	    {
			CreateMap<BeerApiSearchParams, PunkApiSearchParams>();
	    }
	}
}
