import * as api from '../api/apiCalls';
import mapper from '../utils/userMapper';

const signIn = credentials =>
    api.post('/account/login', credentials)
        .then((response) => {
            const signInResult = mapper.mapToSignInResult(response);
            if (signInResult.userProfile) {
                return signInResult.userProfile;
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

const updateProfileInfo = newProfileInfo =>
    api.post('/account/profile', {
        ...mapper.mapToChangableProfileInfo(newProfileInfo)
    })
        .then((response) => {
            const updateResult = mapper.mapToUpdateResult(response);
            if (updateResult.userProfileInfo) {
                return updateResult.userProfile;
            }

            throwError('update profile failed', 'can`t update profile, invalid data');
        })
        .catch((error) => {
            if (!error.reasons) {
                throwError('update profile failed', 'failed, try later');
            }
            throw error;
        });

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
