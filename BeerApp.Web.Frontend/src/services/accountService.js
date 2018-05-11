import * as api from '../api/apiCalls';

function signIn(credentials) {
    return api.post('/account/login', credentials);
}
export default {
    signIn
};
