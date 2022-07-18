class Controller {
    constructor(route, view, store) {
        this.activeRoute = route;
        this.view = view;
        this.store = store;
    }

    addItem(title) {
        const newItem = {
            id: Date.now(),
            title: title
        }
        this.store.addItem(newItem);
    //    TODO: review if additional action is needed
    }
}