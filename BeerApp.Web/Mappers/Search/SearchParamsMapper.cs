using AutoMapper;
using PunkApiSearchParams = BeerApp.PunkApi.Models.Search.SearchParams;
using BeerApiSearchParams = BeerApp.Web.Models.Search.SearchParams;

namespace BeerApp.Web.Mappers.Search
{

	internal class SearchParamsMapper 
    {
	    private static readonly IMapper mapper;

		public static PunkApiSearchParams Map(BeerApiSearchParams searchParams)
		{
			return mapper.Map<BeerApiSearchParams, PunkApiSearchParams>(searchParams);
		}

	    public static BeerApiSearchParams Map(PunkApiSearchParams searchParams)
	    {
			return mapper.Map<PunkApiSearchParams, BeerApiSearchParams>(searchParams);
		}
	}
}
