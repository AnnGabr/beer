using System.Runtime.Serialization;

namespace BeerApp.PunkApi.Models.Beer
{
	[DataContract(Name = "beer")]
	public class BaseBeer
    {
	    [DataMember(Name = "id")]
		public long Id { get; set; }

	    [DataMember(Name = "name")]
		public string BeerName { get; set; }

	    [DataMember(Name = "tagline")]
		public string Tagline { get; set; }

	    [DataMember(Name = "image_url")]
		public string ImageUrl { get; set; }
    }
}
