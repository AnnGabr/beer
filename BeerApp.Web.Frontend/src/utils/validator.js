const validationParams = {
    MAX_AVATAR_SIZE_KB: 500 * 1024,
    MAX_AVATAR_SIZE_MB: 500
};

function validateProfileInfo(profileInfo) {
    const errors = [];
    if (!isValidDate(profileInfo.birthDate)) {
        errors.push('invalid date');
    }
    if (!isValidAvatarImage(profileInfo.avatarImage)) {
        errors.push(`image size must be less then ${validationParams.MAX_AVATAR_SIZE_MB}mb`);
    }

    return errors.length > 0 ? errors : null;
}

function isValidDate({ day, month, year }) {
    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
        monthLength[1] = 29;
    }

    return day <= monthLength[month];
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
