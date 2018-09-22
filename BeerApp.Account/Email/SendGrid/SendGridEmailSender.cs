using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace BeerApp.Account.Services
{
	public class SendGridEmailSender : IEmailSender
	{
		protected readonly DataContractJsonSerializer Serializer = 
			new DataContractJsonSerializer(typeof(ICollection<SendGridResponseError>));

		public SendGridOptions Options { get; }

		public SendGridEmailSender(IOptions<SendGridOptions> optionsAccessor)
		{
			Options = optionsAccessor.Value;
		}

		public async Task<SendEmailResponse> SendEmailAsync(SendEmailDetails details)
		{
			Response response = await SendAsync(Options.SendGridKey, details);
			if (response.StatusCode == System.Net.HttpStatusCode.Accepted)
			{
				return new SendEmailResponse();
			}

			try
			{
				Stream bodyResult = await response.Body.ReadAsStreamAsync();
				var sendGridResponse = Serializer.ReadObject(bodyResult) as SendGridResponse;

				var errorResponse = new SendEmailResponse
				{
					Errors = sendGridResponse?.Errors
						.Select(error => error.Message)
						.ToList()
				};
				if (errorResponse.Errors == null || errorResponse.Errors.Count == 0)
				{
					errorResponse.Errors = new List<string>() {"Unknown error from email sending service."};
				}

				return errorResponse;
			}
			catch (Exception)
			{
				return new SendEmailResponse()
				{
					Errors = new List<string>() {"Unknown error occurred."}
				};
			}
		}

		public async Task<Response> SendAsync(string apiKey, SendEmailDetails details)
		{
			var client = new SendGridClient(apiKey);
			var msg = new SendGridMessage
			{
				From = new EmailAddress(details.FromEmail, details.FromName),
				Subject = details.Subject,
				PlainTextContent = details.IsHtml ? null : details.Content,
				HtmlContent = details.IsHtml ? details.Content : null
			};
			msg.AddTo(new EmailAddress(details.ToEmail, details.ToName));

			//if using custom template
			//msg.TemplateId = "";
			//msg.AddSubstitution("name", "value");

			return await client.SendEmailAsync(msg);
		}
	}
}