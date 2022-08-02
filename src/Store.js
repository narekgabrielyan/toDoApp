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


    updateItem(updateItem, callback) {
        const { id } = updateItem;
        const todoItems = this.getListFromStorage();
        let i = todoItems.length;

        while(i--) {
            if(todoItems[i].id === id) {
                for(let k in updateItem) {
                    todoItems[i][k] = updateItem[k]
                }
                break;
            }
        }

        this.setListIntoStorage(todoItems);

        if(callback) {
            callback();
        }
    }

    removeItems(query, callback) {
        const todos = this.getListFromStorage().filter(i => {
            for(let k in query) {
                if(i[k] !== query[k]) {
                    return true;
                }
            }
            return false;
        });

        this.setListIntoStorage(todos);

        if(callback){
            callback(todos);
        }
    }

    filterItems(query, callback) {
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

    countItems(callback) {
        this.filterItems(QUERIES[''], items => {
            const total = items.length;

            let i = total;
            let completed = 0;

            while(i--) {
                completed += items[i].completed;
            }
            callback(total, total - completed, completed);
        })
    }

}