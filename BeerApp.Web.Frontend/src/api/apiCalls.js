import localStorage from '../services/localStorageService';

export const get = url =>
    fetch(
        url,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getToken()}`
            }
        }
    )
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throwError(response);
        });

export const post = (url, data) =>
    fetch(
        url,
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getToken()}`
            }
        }
    )
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throwError(response);
        });

function getToken() {
    return localStorage.getItem(localStorage.keys.JWT_TOKEN);
}

function throwError(response) {
    const error = new Error(response.statusText);
    error.code = response.status;
    error.response = response;

    throw error;
}
