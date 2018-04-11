using System.Runtime.Serialization;

namespace BeerApp.PunkApi.Models.Beer
{
	[DataContract(Name = "beer")]
	public class DetailedBeer : BeerWithDescription
    {

    }
}
