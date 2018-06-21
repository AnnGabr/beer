const validationParams = {
    MAX_AVATAR_SIZE_KB: 500 * 1024,
    MAX_AVATAR_SIZE_MB: 500
};

function validateProfileInfo(profileInfo) {
    const errors = [];

    if (profileInfo.avatarImage.src && !isValidAvatarImage(profileInfo.avatarImage)) {
        errors.push(`image size must be less than ${validationParams.MAX_AVATAR_SIZE_MB}mb`);
    }

    return errors.length > 0 ? errors : null;
}

const isValidAvatarImage = avatarImage =>
    avatarImage.size <= validationParams.MAX_AVATAR_SIZE_KB;

function validateEmail(email) {

}

function validatePassword(password) {

}

export default {
    validateEmail,
    validatePassword,
    validateProfileInfo,
    validationParams
};
