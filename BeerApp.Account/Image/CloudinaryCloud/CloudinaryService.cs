using System.IO;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using BeerApp.Account.Image.Interfaces;
using BeerApp.Account.Image.Transformations;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;
using CloudinaryAccount = CloudinaryDotNet.Account;

namespace BeerApp.Account.Image.CloudinaryCloud
{
    public class CloudinaryService : IImageCloudService
    {
		public CloudinaryOptions Options { get; }

		protected readonly Cloudinary Cloudinary;
	    protected readonly IMapper Mapper;

		public CloudinaryService(IOptions<CloudinaryOptions> optionsAccessor, IMapper mapper)
		{
			Options = optionsAccessor.Value;
			Mapper = mapper;

			var account = new CloudinaryAccount(Options.CloudName, Options.ApiKey, Options.ApiSecret);
			Cloudinary = new Cloudinary(account);
		}

		public string GetImageUrl(string imageId)
		{
			return Cloudinary.Api.UrlImgUp
				.BuildImageTag(imageId);
		}

		public async Task<ImageUploadResponse> UploadAvatarAsync(FileStream image, TransformationParams transformationParams)
		{
			Transformation transformation = new Transformation()
				.Width(transformationParams.Width)
				.Height(transformationParams.Height)
				.Crop(transformationParams.Crop)
				.Gravity(transformationParams.Gravity);

			CloudinaryUploadResponse uploadResponse = await UploadAsync(image, transformation);

			return new ImageUploadResponse()
			{
				Error = uploadResponse.Error,
				ImageId = uploadResponse.Image?.PublicId
			};
		}

		public async Task<CloudinaryUploadResponse> UploadAsync(FileStream image, Transformation transformation)
		{
			ImageUploadResult uploadResult = await Task.Run(() =>
				Cloudinary.Upload(
					new ImageUploadParams()
					{
						File = new FileDescription(image.Name, image),
						Transformation = transformation
					}));

			if (uploadResult.StatusCode == HttpStatusCode.OK)
			{
				var cloudinaryImage = Mapper.Map<CloudinaryImage>(uploadResult);

				return new CloudinaryUploadResponse()
				{
					Image = cloudinaryImage,
					StatusCode = uploadResult.StatusCode,
					Error = uploadResult.Error.Message
				};
			}

			return new CloudinaryUploadResponse(uploadResult.StatusCode);
				
		}	
    }
}
