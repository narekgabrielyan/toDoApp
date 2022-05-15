/**
 *
 */
class ToDoApp {
    constructor(containerElement) {
        this.containerElement = containerElement;
        this.html = {};
        this.todoList = getFromStorage('todoList') || [];
        this.filter = 'all';
    }

    init() {
        this.createHTML();
        this.addListeners();
        this.updateList();
    }

    addListeners() {
        this.html.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.onInputEntered(e.target.value);
                e.target.value = '';
            }
        });
        this.html.checkAllBtn.addEventListener('click', () => this.toggleAllItems());
    }

    createHTML() {
        const appWrapper = createEl('div', {className: 'wrapper flex flex-column align-center', id: 'container'});
        const listWrapper = createEl('div', {className: 'list_cont flex flex-column', id: 'list_cont'});
        const inputWrapper = createEl('div', {className: 'input_cont flex" id="input_cont', id: 'input_cont'});
        const checkAllBtn = createEl('i', {className: 'lv_icon--arrow'});
        const input = createEl('input', {
            id: 'input',
            type: 'text',
            autofocus: true,
            autocomplete: 'off',
            placeholder: 'What needs to be done?'
        });
        const footerWrapper = createEl('div', {className: 'footer_cont', id: 'footer_cont'});
        const footerCounter = createEl('span', {className: 'footer_count_cont', id: 'itemsCount'});
        const filterBtnWrapper = createEl('div', {className: 'footer_btn_cont'});
        const filterTypes = ['all', 'active', 'completed'];
        filterTypes.forEach(type => {
            const filterBtn = createEl('button', {className: type === this.filter ? 'active' : '', innerText: type});
            filterBtn.dataset.type = type;
            filterBtn.addEventListener('click', (e) => {
                this.filterItems(e.target.dataset.type);
                e.target.classList.add('active');
            });
            filterBtnWrapper.append(filterBtn);
        });

        this.html.appWrapper = appWrapper;
        this.html.listWrapper = listWrapper;
        this.html.footerWrapper = footerWrapper;
        this.html.filterBtnWrapper = filterBtnWrapper;
        this.html.checkAllBtn = checkAllBtn;
        this.html.input = input;

        inputWrapper.append(checkAllBtn, input);
        footerWrapper.append(footerCounter, filterBtnWrapper);
        appWrapper.append(inputWrapper, listWrapper, footerWrapper);
        this.containerElement.appendChild(this.html.appWrapper);
    }

    onInputEntered(title) {
        if (isInputValid(title)) {
            const newItem = this.createItem(title);
            this.addItemActions(newItem);
            this.addItem(newItem);
            this.updateList();
        }
    }

    createItem(title) {
        return new ToDoItem(title);
    }

    addItem(item) {
        this.todoList.push(item);
    }

    removeItem(item) {
        this.todoList = this.todoList.filter(i => i !== item);
    }

    toggleItem(item) {
        const {params, elements} = item;
        params.done = !item.params.done;
        if (elements.wrapper.classList.contains('list_item--done')) {
            elements.wrapper.classList.remove('list_item--done');
        } else {
            elements.wrapper.classList.add('list_item--done');
        }
    }

    editItem(item) {
        const input = createEl('input', {type: 'text', className: 'list_item_edit_input', value: item.params.value});
        const inputListener = (e) => {
            if (e.key === 'Enter') {
                if (isInputValid(e.target.value)) {
                    item.params.value = e.target.value;
                    item.onEdit();
                } else {
                    this.removeItem(item);
                }
                input.remove();
                this.updateList();
            }
        }
        const mouseListener = (e) => {
            if (!input.contains(e.target)) {
                if (isInputValid(input.value)) {
                    item.params.value = input.value;
                    item.onEdit();
                } else {
                    this.removeItem(item);
                }
                input.remove();
                window.removeEventListener('click', mouseListener);
                this.updateList();
            }
        }

        input.addEventListener('keypress', inputListener);
        window.addEventListener('click', mouseListener);
        item.elements.wrapper.appendChild(input);
    }

    addItemActions(item) {
        const {elements} = item;

        elements.cancelBtn.addEventListener('click', () => {
            this.removeItem(item);
            this.updateList();
        });
        elements.checkLabel.addEventListener('click', () => {
            this.toggleItem(item);
            this.updateList();
        });
        elements.titleSpan.addEventListener('dblclick', () => {
            this.editItem(item);
        })
    }

    toggleAllItems() {
        let itemsCount = this.todoList.length;
        if (itemsCount) {
            let notDoneItems = this.todoList.filter(item => !item.params.done);
            if (notDoneItems.length && notDoneItems.length < itemsCount) {
                notDoneItems.forEach(item => this.toggleItem(item));
            } else {
                this.todoList.forEach(item => this.toggleItem(item));
            }
            this.updateList();
        }
    }

    filterItems(criteria) {
        this.filter = criteria;
        this.html.filterBtnWrapper.querySelectorAll('button').forEach(btn => {
            if (btn.className.includes('active')) {
                btn.classList.remove('active');
            }
        })
        this.updateList();
    }

    updateLeftItemsCount() {
        const itemsCount = this.todoList.filter(i => !i.params.done).length;
        this.html.appWrapper.querySelector('#itemsCount').innerText = itemsCount === 1 ? '1 item left' : `${itemsCount} items left`;
    }

    renderFooter() {
        if (this.todoList.length) {
            this.updateLeftItemsCount();
            if (this.html.footerWrapper.className.includes('hidden')) {
                this.html.footerWrapper.classList.remove('hidden');
            }
        } else {
            this.html.footerWrapper.classList.add('hidden');
        }
    }

    renderList() {
        const {html, todoList, filter} = this;
        html.listWrapper.innerHTML = "";
        const activeList = filter === 'all' ? todoList : filter === 'active' ? todoList.filter(i => !i.params.done) : todoList.filter(i => i.params.done);
        activeList.forEach(i => html.listWrapper.appendChild(i.elements.wrapper));
    }

    updateList() {
        this.renderFooter();
        this.renderList();
    }

    start() {
        this.init();
    }

    destroy() {
        this.html.appWrapper.remove();
    }

    edit(el) {
        const ToDoList = getParsedDataFromStorage('ToDoList');
        const title = el.innerText;
    };
}

class ToDoItem {
    constructor(value) {
        this.params = {id: guidGenerator(), value, done: false}
        this.init();
    }

    init() {
        this.createHTML();
    }

    createHTML() {
        const wrapper = createEl('div', {className: 'list_item'});
        const checkInput = createEl('input', {type: 'checkbox', id: guidGenerator()});
        const checkLabel = createEl('label', {className: 'lv_icon--unchecked', for: checkInput.id});
        const titleSpan = createEl('span', {innerText: this.params.value});
        const cancelBtn = createEl('button', {className: 'lv_icon--cancel item_cancel'});

        this.elements = {wrapper, checkLabel, titleSpan, cancelBtn};

        wrapper.append(checkInput, checkLabel, titleSpan, cancelBtn);
    }

    onEdit() {
        this.elements.titleSpan.innerText = this.params.value;
    }
}
