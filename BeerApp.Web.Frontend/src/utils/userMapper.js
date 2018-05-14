const mapToProfileInfo = user => user && ({
    nickName: user.nickName,
    birthDate: user.birthDate,
    email: user.email,
    avatarUrl: user.profilePictureUrl
});

const mapToLoginResult = loginResult => ({
    emailIsNotConfirmed: loginResult.emailIsNotConfirmed,
    userProfileInfo: mapToProfileInfo(loginResult.user)
});

export default {
    mapToProfileInfo,
    mapToLoginResult
};
