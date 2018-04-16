using System;

namespace BeerApp.Web.Models.User
{
	public class UserDto
	{
		public string UserName { get; set; }
		public string Password { get; set; }
		public string Email { get; set; }
		public DateTime? BirthDate { get; set; }
		public string ProfilePictureUrl { get; set; }		
	}
}
