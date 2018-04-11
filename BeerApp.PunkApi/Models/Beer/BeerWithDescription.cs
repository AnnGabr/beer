using System.Runtime.Serialization;

namespace BeerApp.PunkApi.Models.Beer
{
	[DataContract(Name = "beer")]
	public class BeerWithDescription : BaseBeer
    {
	    [DataMember(Name = "description")]
		public string Description { get; set; }
    }
}
