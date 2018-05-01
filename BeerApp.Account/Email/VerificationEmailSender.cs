using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace BeerApp.Account.Services
{
    public class VerificationEmailSender : IVerificationEmailSender
    {
	    private readonly IEmailSender emailSender;

		public VerificationEmailOptions Options { get; }

		public VerificationEmailSender(IOptions<VerificationEmailOptions> optionsAccessor, IEmailSender emailSender)
		{
			this.emailSender = emailSender;
			Options = optionsAccessor.Value;
		}

		public async Task<SendEmailResponse> SendUserVarificationEmailAsync(string toName, string toEmail, string confirmationUrl)
		{
			var details = new SendEmailDetails {
				ToName = toName,
				ToEmail = toEmail,
				FromName = Options.FromName,
				FromEmail = Options.FromEmail,
				Subject = Options.Subject,
				Content = $"Hi, {toName ?? "stranger"}! Please enter <a href=\"{confirmationUrl}\">link</a> to confirm your email.",
				IsHtml = true			
			};

			return await emailSender.SendEmailAsync(details);
		}
    }
}
