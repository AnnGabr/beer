using System.Threading.Tasks;

namespace BeerApp.Account.Services
{
    public interface IVerificationEmailSender
    {
		Task<SendEmailResponse> SendUserVarificationEmailAsync(string toName, string toEmail, string confirmationUrl);
	}
}
