import * as api from '../api/apiCalls';
import mapper from '../utils/userMapper';

const signIn = credentials =>
    api.post('/account/login', credentials)
        .then((response) => {
            const signInResult = mapper.mapToSignInResult(response);
            if (signInResult.userProfileInfo) {
                return signInResult.userProfileInfo;
            }

            const reason = signInResult.emailIsNotConfirmed
                ? 'confirm your email first'
                : 'wrong email or password';
            throwError('sign in failed', reason);
        })
        .catch((error) => {
            if (!error.reasons) {
                throwError('sign in failed', 'oops, something went wrong');
            }
            throw error;
        });

const signOut = () => api.get('/account/logout')
    .catch((error) => {
        if (error.code === 401) {
            throwError('sign out failed', 'user is not authorized');
        }
        throwError('sign out failed', 'server error');
    });

const updateProfileInfo = ({ avatarImage, birthDate }) =>
    api.post('/account/profile', {
        profileImage: avatarImage,
        birthDate
    })
        .then(response => console.log(response))
        .catch(error => console.log('fuck'));

function throwError(message, reasons) {
    const error = new Error(message);
    error.reasons = reasons;
    throw error;
}

export default {
    signIn,
    signOut,
    updateProfileInfo
};
