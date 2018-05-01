using System.Threading.Tasks;

namespace BeerApp.Account.Services
{
	public interface IEmailSender
    {
		Task<SendEmailResponse> SendEmailAsync(SendEmailDetails sendEmailDetails);
    }
}
