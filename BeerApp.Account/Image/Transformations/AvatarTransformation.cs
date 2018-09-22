namespace BeerApp.Account.Image.Transformations
{
    public class AvatarTransformation : TransformationParams
    {
	    public AvatarTransformation()
	    {
		    Height = 256;
		    Width = 256;
		    Crop = "fill";
		    Gravity = "face";
	    }
	}
}
