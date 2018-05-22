using System.Collections.Generic;

namespace BeerApp.Account.Services
{
    public class SendEmailResponse
    {
	    public List<string> Errors { get; set; }
		public bool Succeeded
	    {
		    get => !(Errors?.Count > 0);
	    }	    
	}
}
