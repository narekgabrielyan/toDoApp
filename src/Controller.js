class Controller {
    constructor(route, view, store) {
        this.activeRoute = route;
        this.view = view;
        this.store = store;

        view.bindAddItem(this.addItem.bind(this));
        view.setView();
    }

    addItem(title) {
        const newItem = {
            id: Date.now(),
            title: title
        }
        this.store.addItem(newItem);
    //    TODO: review if additional action is needed
        this.view.clearNewTodo();
    }
}