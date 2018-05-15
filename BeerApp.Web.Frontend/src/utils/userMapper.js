const mapToProfileInfo = user => user && ({
    nickName: user.nickName,
    birthDate: user.birthDate,
    email: user.email,
    avatarUrl: user.profilePictureUrl
});

const mapToSignInResult = SignInResult => ({
    emailIsNotConfirmed: SignInResult.emailIsNotConfirmed,
    userProfileInfo: mapToProfileInfo(SignInResult.user)
});

export default {
    mapToProfileInfo,
    mapToSignInResult
};
