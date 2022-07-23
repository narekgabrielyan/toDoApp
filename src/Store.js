class Store {
    constructor(name) {
        const storage = window.localStorage;

        this.getListFromStorage = () => {
            return JSON.parse(storage.getItem(name)) || [];
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

    filter(query, callback) {
        const itemList = this.getListFromStorage();

        callback(itemList.filter(i => {
            for(let k in query) {
                if(query[k] !== i[k]) {
                    return false;
                }
            }
            return true;
        }))
    }
}