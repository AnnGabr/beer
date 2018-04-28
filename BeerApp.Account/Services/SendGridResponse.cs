using System.Collections.Generic;

namespace BeerApp.Account.Services
{
    public class SendGridResponse
    {
	    public List<SendGridResponseError> Errors { get; set; }
    }
}
