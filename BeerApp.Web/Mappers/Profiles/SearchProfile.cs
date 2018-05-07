using AutoMapper;
using PunkApiSearchParams = BeerApp.PunkApi.Models.Search.SearchParams;
using SearchParams = BeerApp.PunkApi.Models.Search.SearchParams;

namespace BeerApp.Web.Mappers.Profiles
{
    public class SearchProfile : Profile
    {
	    public SearchProfile()
	    {
			CreateMap<SearchParams, PunkApiSearchParams>();
		}
	}
}
