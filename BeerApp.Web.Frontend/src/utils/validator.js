const validationParams = {
    MAX_AVATAR_SIZE_B: 2 * 1024 * 1024,
    MAX_AVATAR_SIZE_KB: 2 * 1024,
    MAX_AVATAR_SIZE_MB: 2
};

function validateProfileInfo(profileInfo) {
    const errors = [];

    if (profileInfo.avatarImage.src && !isValidAvatarImage(profileInfo.avatarImage)) {
        errors.push(`image size must be less than ${validationParams.MAX_AVATAR_SIZE_MB}mb`);
    }

    return errors.length > 0 ? errors : null;
}

const isValidAvatarImage = avatarImage =>
    avatarImage.size <= validationParams.MAX_AVATAR_SIZE_B;

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
