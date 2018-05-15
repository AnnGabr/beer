export const get = url =>
    fetch(url)
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
                'Content-Type': 'application/json'
            }
        }
    )
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throwError(response);
        });

function throwError(response) {
    const error = new Error(response.statusText);
    error.code = response.status;
    error.response = response;
    throw error;
}
