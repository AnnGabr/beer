using System.Collections.Generic;

namespace BeerApp.Account.Services
{
    public class SendEmailResponse
    {
	    public bool Succeeded
	    {
		    get => !(Errors?.Count > 0);
	    }

	    public List<string> Errors { get; set; }
	}
}
