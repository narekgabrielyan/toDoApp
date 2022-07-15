class Store {
    constructor(name, callback) {
        const storage = window.localStorage;

        this.getFromStorage = () => {
            return JSON.parse(storage.getItem(name)) || '';
        }

        this.setIntoStorage = (data) => {
            storage.setItem(name, JSON.stringify(data));
        }

        if (callback) {
            callback();
        }
    }
}