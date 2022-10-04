import {QUERIES} from "./constants";
import {getDataFromLocalStorage, setDataToLocalStorage} from "./utils";

export default class Store {
    constructor(name) {
        this.getFromStorage = () => {
            return getDataFromLocalStorage(name) || [];
        }

        this.setIntoStorage = (data) => {
            setDataToLocalStorage(name, data);
        }
    }

    addItem(item, callback) {
        let todoList = this.getFromStorage();
        todoList.push(item);
        this.setIntoStorage(todoList);
        callback?.();
    }


    updateItem(updateItem, callback) {
        const todoItems = this.getFromStorage();

        const todoItemFound = todoItems.find(todoItem => todoItem.id === updateItem.id);

        if(todoItemFound) Object.assign(todoItemFound, updateItem);

        this.setIntoStorage(todoItems);

        callback?.();
    }

    removeItems(query, callback) {
        const todos = this.getFromStorage().filter(i => {
            for(let k in query) {
                if(i[k] !== query[k]) {
                    return true;
                }
            }
            return false;
        });

        this.setIntoStorage(todos);

        callback?.(todos);
    }

    filterItems(query, callback) {
        const itemList = this.getFromStorage();
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