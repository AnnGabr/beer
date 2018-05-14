export const get = url =>
    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            const errorMessage = `${response.status} (${response.statusText})`;
            const error = new Error(errorMessage);
            throw (error);
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
            const error = new Error(response.statusText);
            error.response = response;
            throw error;
        });
