using System;
using System.ComponentModel.DataAnnotations;

namespace BeerApp.Web.Models.User
{
	public class UserToRegister
	{
		[Required]
		[StringLength(30, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
		public string NickName { get; set; }

		[Required]
		[StringLength(30, ErrorMessage = "The {0} at max {1} characters long.")]
		public string Password { get; set; }

		[Required]
		[EmailAddress]
		public string Email { get; set; }

		[DataType(DataType.Date)]
		public DateTime? BirthDate { get; set; }

		[Url(ErrorMessage = "Wrong url format.")]
		public string ProfilePictureUrl { get; set; }
	}
}
