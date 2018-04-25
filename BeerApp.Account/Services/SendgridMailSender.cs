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
			var apiKey = Environment.GetEnvironmentVariable("BEER_SENDGRID_KEY");
			var client = new SendGridClient(apiKey);
			var from = new EmailAddress("annbaks1997@gmail.com", "Example User");
			var subject = "Sending with SendGrid is Fun";
			var to = new EmailAddress("test@example.com", "Example User");
			var plainTextContent = "and easy to do anywhere, even with C#";
			var htmlContent = "<strong>and easy to do anywhere, even with C#</strong>";
			var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
			var response = await client.SendEmailAsync(msg);
		}
	}
}