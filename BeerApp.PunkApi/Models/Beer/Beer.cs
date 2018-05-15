using System.Collections.Generic;
using System.Runtime.Serialization;

namespace BeerApp.PunkApi.Models.Beer
{
	[DataContract(Name = "beer")]
	public class Beer 
	{
		[DataMember(Name = "id")]
		public int PunkId { get; set; }

		[DataMember(Name = "name")]
		public string BeerName { get; set; }

		[DataMember(Name = "tagline")]
		public string Tagline { get; set; }

		[DataMember(Name = "image_url")]
		public string ImageUrl { get; set; }

		[DataMember(Name = "description")]
		public string Description { get; set; }

		[DataMember(Name = "abv")]
		public float? Abv { get; set; }

		[DataMember(Name = "ibu")]
		public float? Ibu { get; set; }

		[DataMember(Name = "ebc")]
		public float? Ebc { get; set; }

		[DataMember(Name = "food_pairing")]
		public List<string> FoodPairing { get; set; }

		[DataMember(Name = "brewers_tips")]
		public string BrewersTips { get; set; }

		[DataMember(Name = "boil_volume")]
		public ValueInUnit BoilVolume { get; set; }

		[DataMember(Name = "method")]
		public Method Method { get; set; }

		[DataMember(Name = "ingredients")]
		public Ingredients Ingredients { get; set; }
    }

	[DataContract(Name = "method")]
	public class Method
	{
		[DataMember(Name = "mash_temp")]
		public List<MashTemp> MashTemp { get; set; }

		[DataMember(Name = "fermentation")]
		public Fermentation Fermentation { get; set; }

		[DataMember(Name = "twist")]
		public string Twist { get; set; }
	}

	[DataContract(Name = "mash_temp")]
	public class MashTemp
	{
		[DataMember(Name = "temp")]
		public ValueInUnit Temp { get; set; }

		[DataMember(Name = "duration")]
		public int? Duration { get; set; }
	}

	[DataContract(Name = "fermentation")]
	public class Fermentation
	{
		[DataMember(Name = "temp")]
		public ValueInUnit Temp { get; set; }
	}

	[DataContract(Name = "ingredients")]
	public class Ingredients
	{
		[DataMember(Name = "malt")]
		public List<Malt> Malt { get; set; }

		[DataMember(Name = "hops")]
		public List<Hop> Hops { get; set; }

		[DataMember(Name = "yeast")]
		public string Yeast { get; set; }
	}

	[DataContract(Name = "malt")]
	public class Malt : Ingredient {}

	[DataContract(Name = "hop")]
	public class Hop : Ingredient
	{
		[DataMember(Name = "add")]
		public string Add { get; set; }
	}

	[DataContract(Name = "ingredient")]
	public class Ingredient
	{
		[DataMember(Name = "name")]
		public string Name { get; set; }

		[DataMember(Name = "amount")]
		public ValueInUnit Amount { get; set; }
	}

	[DataContract(Name = "value_unit")]
	public class ValueInUnit
	{
		[DataMember(Name = "value")]
		public float? Value { get; set; }

		[DataMember(Name = "unit")]
		public string Unit { get; set; }
	}
}
