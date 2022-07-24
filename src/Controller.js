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

    filter() {
        this.store.filter(QUERIES[this.activeRoute], this.view.showItems.bind(this.view));
        this.store.count((total, active, completed) => {
            this.view.setMainVisibility(total);
            this.view.setActiveItemsCount(active);
            this.view.setClearCompletedBtnVisibility(completed);
        })
    }
}