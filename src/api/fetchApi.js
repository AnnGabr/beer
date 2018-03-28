export const get = url =>
    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response;
            }
            const errorMessage = `${response.status} (${response.statusText})`;
            const error = new Error(errorMessage);
            throw (error);
        })
        .then(response => response.text());
