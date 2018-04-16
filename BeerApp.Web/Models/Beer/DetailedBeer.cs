using System.Collections.Generic;

namespace BeerApp.Web.Models.Beer
{
	public class DetailedBeer : BeerWithDescription
	{
		public Properties Properties { get; set; }	
		public List<string> FoodPairing { get; set; }
		public string BrewersTips { get; set; }
		public Method Method { get; set; }
		public Ingredients Ingredients { get; set; }
	}

	public class Properties
	{
		public float? Abv { get; set; }
		public float? Ibu { get; set; }
		public float? Ebc { get; set; }
	}

	public class Method
	{
		public List<MashTemp> MashTemp { get; set; }
		public Fermentation Fermentation { get; set; }
		public string Twist { get; set; }
	}

	public class MashTemp
	{
		public ValueInUnit Temp { get; set; }
		public int? Duration { get; set; }
	}

	public class Fermentation
	{
		public ValueInUnit Temp { get; set; }
	}

	public class Ingredients
	{
		public ValueInUnit Water { get; set; } 
		public List<Malt> Malt { get; set; }
		public List<Hop> Hops { get; set; }
	}

	public class Malt : Ingredient { }

	public class Hop : Ingredient
	{
		public string Add { get; set; }
	}

	public class Ingredient
	{
		public string Name { get; set; }
		public ValueInUnit Amount { get; set; }
	}

	public class ValueInUnit
	{
		public float? Value { get; set; }
		public string Unit { get; set; }
	}
	
}
