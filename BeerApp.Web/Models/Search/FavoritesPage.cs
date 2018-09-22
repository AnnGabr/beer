using BeerApp.Web.Models.Beer;
using System.Collections.Generic;

namespace BeerApp.Web.Models.Search
{
    public class FavoritesPage
    { 
        public int Page { get; set; }
        public int PagesCount { get; set; }
        public IEnumerable<BeerWithDescription> Beers { get; set; }
    }
}
