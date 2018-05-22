import cloudinary from 'cloudinary';

const CLOUNDARY_NAME = 'anngabr';
const API_KEY = '236871241182974';
const API_SECRET = 'cJ10C7bt5DaOv2YffDKvUbtZCVE';

cloudinary.config({
    cloud_name: CLOUNDARY_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
});

function uploadImage(imagePath, onupload) {
    cloudinary.uploader.upload(
        imagePath,
        (result) => { console.log(result); },
        {
            ...getTransformationProperties()
        }
    );
}

const getTransformationProperties = () => ({
    width: 256,
    height: 256,
    crop: 'fill',
    gravity: 'face'
});

function getImageUrl(imageName) {
    const url = cloudinary.url(imageName, getTransformationProperties());

    return url;
}

export default {
    uploadImage,
    getImageUrl
};
