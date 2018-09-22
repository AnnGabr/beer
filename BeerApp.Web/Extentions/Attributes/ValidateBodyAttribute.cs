using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace BeerApp.Web.Extentions.Attributes
{
	public class ValidateBodyAttribute : ActionFilterAttribute
	{
		public override void OnActionExecuting(ActionExecutingContext context)
		{
			if (!context.ModelState.IsValid)
			{
				context.Result = new BadRequestObjectResult(context.ModelState.Values
					.SelectMany(value => value.Errors.Select(error => error.ErrorMessage))
					.ToArray());
			}
		}
	}
}
