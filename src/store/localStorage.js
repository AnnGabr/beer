const STATE_KEY = 'state';

export const loadState = () => {
    let state;
    try{
        const serializedState = localStorage.getItem(STATE_KEY);
        state = JSON.parse(serializedState);
    } catch(err) {
        console.log('Error: load state from local storage failed.');
    }

    return state;
}

export const saveState = (state) => { 
    try{
        const serializedState = JSON.stringify(state);
        localStorage.setItem(STATE_KEY, serializedState);
    } catch(err) {
        console.log('Error: can not save state to local storage');
    }
}