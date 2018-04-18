using System;
using System.ComponentModel.DataAnnotations;

namespace BeerApp.Web.Models.User
{
	public class UserDto
	{
		[Required]
		public string NickName { get; set; }

		[Required]
		[DataType(DataType.Password)]
		public string Password { get; set; }

		[Required]
		[DataType(DataType.EmailAddress)]
		public string Email { get; set; }

		[DataType(DataType.Date)]
		[DisplayFormat(DataFormatString = "{0:dd.MM.yyyy}")]
		public DateTime? BirthDate { get; set; }

		[Url]
		public string ProfilePictureUrl { get; set; }

		public bool RememberMe { get; set; }
	}
}
