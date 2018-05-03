using System;
using System.ComponentModel.DataAnnotations;
using BeerApp.Web.Extentions.Attributes;

namespace BeerApp.Web.Models.User
{
	public class UserToRegister
	{
		[Required]
		[StringLength(30, ErrorMessage = "The {0} must be {2}-{1} characters long.", MinimumLength = 6)]
		public string NickName { get; set; }

		[Required]
		[StringLength(30, ErrorMessage = "The {0} must be at max {1} characters long.")]
		public string Password { get; set; }

		[Required]
		[EmailAddress]
		public string Email { get; set; }

		[BirthDate(ErrorMessage = "Wrong birth date.")]
		public DateTime? BirthDate { get; set; }

		[Url(ErrorMessage = "Wrong url format.")]
		public string ProfilePictureUrl { get; set; }
	}
}
