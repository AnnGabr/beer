const STATE_KEY = 'state';

export const loadState = () => {
    try{
        const serializedState = localStorage.getItem(STATE_KEY);
        if(serializedState === null) {
            return undefined;
        }
        console.log('State loaded.');
        return JSON.parse(serializedState);
    } catch(err) {
        console.log('Error: load state from local storage failed.');
        return undefined;
    }
}

export const saveState = (state) => {
    try{
        const serializedState = JSON.stringify(state);
        localStorage.setItem(STATE_KEY, serializedState);
        console.log('State saved.');
    } catch(err) {
        console.log('Error: can not save state to local storage');
    }
}