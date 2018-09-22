using System;

namespace BeerApp.Account.Helpers
{
    internal class Validator
    {
	    private const int BirthDateShift = 120;
		
	    public static bool IsBirthDateValid(DateTime birthDate)
	    {
		    return birthDate.Year <= DateTime.Now.Year 
				&& birthDate.Year >= DateTime.Now.Year - BirthDateShift;
	    }
    }
}
