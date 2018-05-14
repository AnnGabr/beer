import * as api from '../api/apiCalls';
import mapper from '../utils/userMapper';

function signIn(credentials) {
    return api.post('/account/login', credentials)
        .then((response) => {
            const loginResult = mapper.mapToLoginResult(response);
            if (loginResult.userProfileInfo) {
                return loginResult.userProfileInfo;
            }

            const error = new Error('user validation failed');
            error.validationError = loginResult.emailIsNotConfirmed
                ? 'confirm your email first'
                : 'wrong login or password';
            throw (error);
        });
}

export default {
    signIn
};
