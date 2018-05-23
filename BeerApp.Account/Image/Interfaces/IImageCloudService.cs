using System.Threading.Tasks;
using BeerApp.Account.Image.Transformations;

namespace BeerApp.Account.Image
{
    public interface IImageCloudService
    {
	    Task<ImageUploadResponse> UploadAvatarAsync(string base64StringImage, TransformationParams transformationParams);
	    string GetImageUrl(string imageId);
    }
}
