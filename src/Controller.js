class Controller {
    constructor(view, store) {
        this.activeRoute = '';
        this.lastActiveRoute = null;
        this.view = view;
        this.store = store;

        view.bindAddItem(this.addItem.bind(this));
        view.bindToggleItem((id, completed) => {
            this.toggleItem(id, completed);
            this.filter();
        })
        view.bindRemoveItem(this.removeItem.bind(this));
        view.bindClearCompletedItems(this.clearCompletedItems.bind(this));
        view.bindToggleAll(this.toggleAll.bind(this));
        view.bindEditItemCancel(this.editItemCancel.bind(this));
        view.bindEditItemSave(this.editItemSave.bind(this));
    }

    setView(href) {
        const route = href.replace(/^#\//, '');
        this.activeRoute = route;
        this.filter();
        this.view.updateFooterButtons(route);
    }

    addItem(title) {
        this.store.addItem({
            id: `${Date.now()}`,
            title: title,
            completed: false
        }, () => {
            this.view.clearNewTodo();
            this.filter(true);
        });
    }

    removeItem(id) {
        this.store.removeItems({id}, () => {
            this.filter();
            this.view.removeItem(id);
        });
    }

    toggleItem(id, completed) {
        this.store.updateItem({id, completed}, () => this.view.setItemCompleted(id, completed));
    }

    toggleAll(checked) {
        this.store.filterItems({completed: !checked}, items => {
            items.forEach(item => {
                this.toggleItem(item.id, checked);
            })
        })

        this.filter();
    }

    editItemCancel(id) {
        this.store.filterItems({id}, (items) => {
            const title = items[0].title;
            this.view.editItemDone(id, title);
        })
    }

    editItemSave(id, title) {
        if(title.length) {
            this.store.updateItem({id, title}, () => {
                this.view.editItemDone(id, title);
            })
        } else {
            this.removeItem(id);
        }
    }

    filter(force) {
        const route = this.activeRoute;

        if (force || this.lastActiveRoute !== '' || this.lastActiveRoute !== route) {
            this.store.filterItems(QUERIES[route], this.view.showItems.bind(this.view));
        }
        this.store.countItems((total, active, completed) => {
            this.view.setToggleAllCheckedState(completed === total);
            this.view.setActiveItemsCount(active);
            this.view.setMainVisibility(total);
            this.view.setClearCompletedBtnVisibility(completed);
        });

        this.lastActiveRoute = route;
    }

    clearCompletedItems() {
        this.store.removeItems(QUERIES.completed, () => this.filter(true));
    }
}