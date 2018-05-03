using System;
using System.ComponentModel.DataAnnotations;

namespace BeerApp.Web.Extentions.Attributes
{
    public class BirthDateAttribute : ValidationAttribute
    {
	    public override bool IsValid(object value)
	    {
			if (value == null)
			{
				return true;
			}

			return (DateTime)value < DateTime.Now;
	    }
	}
}