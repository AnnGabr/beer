using System.Threading.Tasks;

namespace BeerApp.Account.Services
{
    public interface IVarificationEmailSender
    {
	    Task<SendEmailResponse> SendUserVarificationEmailAsync(SendEmailDetails details, string varificationUrl);
    }
}
