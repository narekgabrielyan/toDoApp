class View {
    constructor(template) {
        this.listWrapper = qs('.list_cont');
        this.newTodo = qs('.new-todo');
        this.main = qs('.main');
        this.activeCount = qs('.footer_count_cont', this.main);
        this.clearCompleted = qs('.clear_completed-btn', this.main);
        this.template = template;
    }

    bindAddItem(callback) {
        this.newTodo.addEventListener('change', (e) => {
            const title = e.target.value.trim();
            if(title) {
                callback(title);
            }
        })
    }

    bindToggleItem(callback) {
        delegateEvent(this.main, '.toggle_item', 'click', ({target}) => {
            callback(getTargetedItemId(target), target.checked);
        });
    }

    bindClearCompletedItems(handler) {
        this.clearCompleted.addEventListener('click', () => {
            handler();
        })
    }

    clearNewTodo() {
        this.newTodo.value = '';
    }

    showItems(items) {
        this.listWrapper.innerHTML = this.template.itemsList(items);
    }

    setMainVisibility(visible) {
        this.main.style.display = !!visible ? 'flex' : 'none';
    }

    setActiveItemsCount(activeItemsCount) {
        this.activeCount.innerText = activeItemsCount === 1 ? '1 item left' : `${activeItemsCount} items left`;
    }

    setClearCompletedBtnVisibility(visible) {
        this.clearCompleted.style.display = !!visible ? 'block' : 'none';
    }

    updateFooterButtons(route) {
        qs('.filter-btn.filter-btn--active', this.main).classList.remove('filter-btn--active');
        qs(`.filter-btn[href="#/${route}"]`, this.main).classList.add('filter-btn--active');
    }

    setItemCompleted(id, completed) {
        const item = document.getElementById(id);
        const itemCheckbox = document.getElementById(`toggle${id}`);
        if(!item) {
            return;
        }

        item.className = completed ? 'list_item list_item--done' : 'list_item';
        itemCheckbox.checked = completed;
    }
}