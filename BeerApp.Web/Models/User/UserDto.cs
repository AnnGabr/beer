using System;
using System.ComponentModel.DataAnnotations;

namespace BeerApp.Web.Models.User
{
	public class UserDto
	{
		[Required]
		[StringLength(30, MinimumLength = 4)]
		public string NickName { get; set; }

		[Required]
		[StringLength(30, MinimumLength = 8)]
		public string Password { get; set; }

		[Required]
		[DataType(DataType.EmailAddress)]
		public string Email { get; set; }

		[DataType(DataType.Date)]
		public DateTime? BirthDate { get; set; }

		[Url]
		public string ProfilePictureUrl { get; set; }

		public bool RememberMe { get; set; } = false;
	}
}
