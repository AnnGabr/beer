using System.Collections.Generic;
using System.Runtime.Serialization;

namespace BeerApp.PunkApi.Models.Beer.DetailedBeer
{
	[DataContract(Name = "beer")]
	public class DetailedBeer : BeerWithDescription
	{
		[DataMember(Name = "abv")]
		public float Abv { get; set; }

		[DataMember(Name = "ibu")]
		public float Ibu { get; set; }

		[DataMember(Name = "ebc")]
		public float Ebc { get; set; }

		[DataMember(Name = "food_pairing")]
		public List<string> FoodPairing { get; set; }

		[DataMember(Name = "brewers_tips")]
		public string BrewersTips { get; set; }

		[DataMember(Name = "boil_volume")]
		public ValueUnit BoilVolume { get; set; }

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
		public Temp temp { get; set; }
		public int duration { get; set; }
	}

	[DataContract(Name = "fermentation")]
	public class Fermentation
	{
		public Temp temp { get; set; }
	}

	[DataContract(Name = "value_unit")]
	public class ValueUnit
	{
		[DataMember(Name = "value")]
		public int Value { get; set; }

		[DataMember(Name = "unit")]
		public string Unit { get; set; }
	}

	public class Temp
	{
		public int value { get; set; }
		public string unit { get; set; }
	}

	

	

	public class Amount
	{
		public double value { get; set; }
		public string unit { get; set; }
	}

	public class Malt
	{
		public string name { get; set; }
		public Amount amount { get; set; }
	}

	public class Amount2
	{
		public double value { get; set; }
		public string unit { get; set; }
	}

	public class Hop
	{
		public string name { get; set; }
		public Amount2 amount { get; set; }
		public string add { get; set; }
		public string attribute { get; set; }
	}

	public class Ingredients
	{
		public List<Malt> malt { get; set; }
		public List<Hop> hops { get; set; }
	}
}
