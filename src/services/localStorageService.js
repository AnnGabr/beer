const localStorageService = {
    getItem(key) {
        let item;
        try {
            const serializedItem = localStorage.getItem(key);
            item = JSON.parse(serializedItem);
        } catch (err) {
            console.log('Error: can not get item from local storage by key=&{key}');
        }

        return item;
    },

    setItem(key, item) {
        try {
            const serializedItem = JSON.stringify(item);
            localStorage.setItem(key, serializedItem);
        } catch (err) {
            console.log(`Error: can not save item ${item} in local storage with key=${key}`);
        }
    },
};

export default localStorageService;
