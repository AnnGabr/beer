using System.IO;
using System.Threading.Tasks;
using BeerApp.Account.Image.Transformations;

namespace BeerApp.Account.Image.Interfaces
{
    public interface IImageCloudService
    {
	    Task<ImageUploadResponse> UploadAvatarAsync(FileStream image, TransformationParams transformationParams);
	    string GetImageUrl(string imageId);
    }
}
