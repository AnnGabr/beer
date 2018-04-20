namespace BeerApp.Web.Models.Response
{
    public class BadRequestResponse
    {
	    public int Code { get; set; } = 400;
	    public string Error { get; set; } = "Bad Request";
	    public string Message { get; set; }

	    public BadRequestResponse(string mesasge)
	    {
		    Message = mesasge;
	    }

	    public BadRequestResponse(int code, string error, string message)
	    {
		    Code = code;
		    Error = error;
		    Message = message;
	    }
    }
}
