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
        const filteredItems = itemList.filter(i => {
            for(let k in query) {
                if(query[k] !== i[k]) {
                    return false;
                }
            }
            return true;
        });

        callback(filteredItems);
    }

    count(callback) {
        this.filter(QUERIES[''], items => {
            const total = items.length;

            let i = total;
            let completed = 0;

            while(i--) {
                completed += items[i].completed;
            }
            callback(total, total - completed, completed);
        })
    }

    remove(query, callback) {
        const todos = this.getListFromStorage().filter(i => {
            for(let k in query) {
                if(query[k] !== i[k]) {
                    return true;
                }
            }
            return false;
        });

        this.setListIntoStorage(todos);

        if(callback) {
            callback(todos);
        }
    }
}