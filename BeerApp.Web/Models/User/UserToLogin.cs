using System.ComponentModel.DataAnnotations;

namespace BeerApp.Web.Models.User
{
    public class UserToLogin
    {
		[Required]
		public string Password { get; set; }

		[Required]
		public string Email { get; set; }
		public bool RememberMe { get; set; } = false;
	}
}
