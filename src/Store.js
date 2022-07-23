class Store {
    constructor(name) {
        const storage = window.localStorage;

        this.getListFromStorage = () => {
            return JSON.parse(storage.getItem(name)) || '';
        }

        this.setListIntoStorage = (list) => {
            storage.setItem(name, JSON.stringify(list));
        }
    }

    addItem(item, callback) {
        let todoList = this.getListFromStorage();
        todoList.push(item);
        this.setListIntoStorage(todoList);
        if(callback) {
            callback();
        }
    }
}