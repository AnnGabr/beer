using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BeerApp.Account.Models
{
    class UserIdentity
    {
		public int UserId { get; set; }
		public string Name { get; set; }
		public string Password { get; set; }
		public string Login { get; set; }
		public string ProfilePictureUrl { get; set; }

		[DataType(DataType.EmailAddress)]
		public string Email { get; set; }

		public ContactStatus Status { get; set; }
	}

	public enum ContactStatus
	{
		Submitted,
		Approved,
		Rejected
	}
}
