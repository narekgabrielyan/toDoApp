class View {
    constructor(template) {
        this.listWrapper = qs('.list_cont');
        this.toggleAll = qs('.toggle_all');
        this.newTodo = qs('.new-todo');
        this.main = qs('.main');
        this.activeCount = qs('.footer_count_cont', this.main);
        this.clearCompleted = qs('.clear_completed-btn', this.main);
        this.template = template;

        delegateEvent(this.main, '.list_item_title', 'dblclick', ({target}) => {
            this.setEditItem(target);
        })
    }

    bindAddItem(callback) {
        this.newTodo.addEventListener('change', (e) => {
            const title = e.target.value.trim();
            if(title) {
                callback(title);
            }
        })
    }

    bindRemoveItem(callback) {
        delegateEvent(this.main, '.list_item_cancel-btn', 'click', ({target}) => {
            callback(getTargetedItemId(target));
        });
    }

    bindToggleItem(callback) {
        delegateEvent(this.main, '.toggle_item', 'click', ({target}) => {
            callback(getTargetedItemId(target), target.checked);
        });
    }

    bindToggleAll(callback) {
        this.toggleAll.addEventListener('click', (e) => {
            const isChecked = e.target.checked;
            callback(isChecked);
        })
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

    setToggleAllCheckedState(checked) {
        this.toggleAll.checked = !!checked;
    }

    setEditItem(target) {
        const targetParent = target.parentElement;
        const editInput = createEl('input', {className: 'input_edit', value: target.innerText});

        targetParent.appendChild(editInput);

        editInput.focus();
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

    removeItem(id) {
        const item = document.getElementById(id);

        if(!item) {
            return;
        }

        this.listWrapper.removeChild(item);
    }
}