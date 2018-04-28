using System.Threading.Tasks;

namespace BeerApp.Account.Services
{
    public class VarificationEmailSender : IVarificationEmailSender
    {
	    private readonly IEmailSender emailSender;

		public VarificationEmailSender(IEmailSender emailSender)
		{
			this.emailSender = emailSender;
		}

		public async Task<SendEmailResponse> SendUserVarificationEmailAsync(SendEmailDetails details, string varificationUrl)
		{
			details.Content = $"Hi, {details.ToName ?? "stranger"}! Please enter <a href=\"{varificationUrl}\">link</a> to confirm your email.";
			details.IsHtml = true;

			return await emailSender.SendEmailAsync(details);
		}
    }
}
