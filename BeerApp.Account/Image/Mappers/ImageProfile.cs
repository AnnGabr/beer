using AutoMapper;
using CloudinaryDotNet.Actions;

namespace BeerApp.Account.Image.Mappers
{
    public class ImageProfile : Profile
    {
	    public ImageProfile()
	    {
		    CreateMap<ImageUploadResult, CloudinaryImage>();
	    }
	}
}
