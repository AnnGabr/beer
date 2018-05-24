const mapToSignInResult = signInResponse => ({
    emailIsNotConfirmed: signInResponse.emailIsNotConfirmed,
    userProfile: mapToProfileInfo(signInResponse.user)
});

const mapToUpdateResult = updateResponse => ({
    errors: updateResponse.errors,
    userProfile: mapToProfileInfo(updateResponse.profile)
});

const mapToProfileInfo = user => user && ({
    nickName: user.nickName,
    birthDate: user.birthDate,
    email: user.email,
    avatarUrl: user.profilePictureUrl
});

const mapToChangableProfileInfo = profileInfo => ({
    birthDate: profileInfo.birthDate,
    profileImage: profileInfo.avatarImage.src
});

export default {
    mapToProfileInfo,
    mapToSignInResult,
    mapToUpdateResult,
    mapToChangableProfileInfo
};
