class Controller {
    constructor(view, store) {
        this.activeRoute = '';
        this.view = view;
        this.store = store;

        view.bindAddItem(this.addItem.bind(this));
        view.bindClearCompletedItems(this.clearCompletedItems.bind(this))
    }

    setView(href) {
        const route = href.replace(/^#\//, '');
        this.filter(true);
        this.view.updateFooterButtons(route);
    }

    addItem(title) {
        this.store.addItem({
            id: Date.now(),
            title: title,
            completed: true
        }, () => {
            this.view.clearNewTodo();
            this.filter(true);
        });
    }

    filter(force) {
        if(force) {
            this.store.filter(QUERIES[this.activeRoute], this.view.showItems.bind(this.view));
        }
        this.store.count((total, active, completed) => {
            this.view.setMainVisibility(total);
            this.view.setActiveItemsCount(active);
            this.view.setClearCompletedBtnVisibility(completed);
        })
    }

    clearCompletedItems() {
        this.store.remove(QUERIES['completed'], () => this.filter(true));
    }
}