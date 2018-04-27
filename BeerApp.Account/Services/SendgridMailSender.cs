using System;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace BeerApp.Account.Services
{
	internal class SendgridMailSender : IMailSender
	{
		public async Task Send()
		{
			string apiKey = Environment.GetEnvironmentVariable("BEER_SENDGRID_KEY");
			var client = new SendGridClient(apiKey);
			var from = new EmailAddress("ann.gabrusionok@gmail.com", "Example User");
			string subject = "Sending with SendGrid is Fun";
			var to = new EmailAddress("annabaks1997@gmail.com", "Example User");
			string plainTextContent = "and easy to do anywhere, even with C#";
			string htmlContent = "<strong>and easy to do anywhere, even with C#</strong>";
			SendGridMessage msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
			Response response = await client.SendEmailAsync(msg);
		}
	}
}