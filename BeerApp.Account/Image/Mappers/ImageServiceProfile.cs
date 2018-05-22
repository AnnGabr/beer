using AutoMapper;
using BeerApp.Account.Image.CloudinaryCloud;
using CloudinaryDotNet.Actions;

namespace BeerApp.Account.Image.Mappers
{
    public class ImageServiceProfile : Profile
    {
	    public ImageServiceProfile()
	    {
		    CreateMap<ImageUploadResult, CloudinaryImage>();
	    }
	}
}
