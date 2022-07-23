class Controller {
    constructor(view, store) {
        this.activeRoute = '';
        this.view = view;
        this.store = store;

        view.bindAddItem(this.addItem.bind(this));
    }

    addItem(title) {
        this.store.addItem({
            id: Date.now(),
            title: title,
            completed: false
        }, () => {
            this.view.clearNewTodo();
            this.filter();
        });
    }

    getFilterQuery(criteria = this.activeRoute) {
        return {'': {}, 'active': {completed: false}, 'completed': {completed: true}}[criteria];
    }

    filter() {
        this.store.filter(this.getFilterQuery(), this.view.showItems.bind(this.view));
    }
}