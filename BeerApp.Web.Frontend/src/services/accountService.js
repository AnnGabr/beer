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
            throwValidationError('sign in failed', reason);
        })
        .catch((error) => {
            if (!error.reasons) {
                throwValidationError('sign in failed', 'oops, something went wrong');
            }
            throw error;
        });

function throwValidationError(message, reasons) {
    const error = new Error(message);
    error.reasons = reasons;
    throw error;
}

export default {
    signIn
};
