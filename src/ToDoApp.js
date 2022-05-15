/**
 *
 */
class ToDoApp {
    constructor(containerElement) {
        this.containerElement = containerElement;
        this.html = {};
        this.store = {
            todoList: [],
            activeList: []
        };
        this.filter = 'all';
        this.init();
    }

    init() {
        /**
         * TODO: try to move
         */
        window.addEventListener('load', () => this.renderList());

        this.createHTML();

        addBtnListener.call(this.html.input, 'Enter', (e) => {
            this.onInputEntered(e.target.value);
            e.target.value = '';
        });
        this.html.checkAllBtn.addEventListener('click', () => this.toggleAllItems());

        this.updateList();
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

        this.html.appWrapper = appWrapper;
        this.html.listWrapper = listWrapper;
        this.html.checkAllBtn = checkAllBtn;
        this.html.input = input;

        inputWrapper.append(checkAllBtn, input);
        appWrapper.append(inputWrapper, listWrapper);
    }

    onInputEntered(title) {
        if(title) {
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
        this.store.todoList.push(item);
    }

    removeItem(item) {
        this.store.todoList = this.store.todoList.filter(i => i !== item);
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

    addItemActions(item) {
        const {elements} = item;

        elements.cancelBtn.addEventListener('click', () => {
            this.removeItem(item);
            this.updateList();
        });
        elements.checkLabel.addEventListener('click', () => this.toggleItem(item));
    }

    toggleAllItems() {
        let itemsCount = this.store.todoList.length;
        if (itemsCount) {
            let notDoneItems = this.store.todoList.filter(item => !item.params.done);
            if (notDoneItems.length && notDoneItems.length < itemsCount) {
                notDoneItems.forEach(item => this.toggleItem(item));
            } else {
                this.store.todoList.forEach(item => this.toggleItem(item));
            }
        }
    }

    updateList() {
        this.store.activeList = this.filter === 'all' ? this.store.todoList : this.filter === 'active' ? this.store.todoList.filter(i => !i.params.done) : this.store.todoList.filter(i => i.params.done);
        this.renderList();
    }

    renderList() {
        const {html: {listWrapper}, store: {activeList}} = this;
        listWrapper.innerHTML = "";
        activeList.forEach(i => listWrapper.appendChild(i.elements.wrapper));
    }

    start() {
        this.containerElement.appendChild(this.html.appWrapper);
    }

    destroy() {
        this.html.appWrapper.remove();
    }

    edit(el) {
        const ToDoList = getParsedDataFromStorage('ToDoList');
        const title = el.innerText;
        const input = createEl('input', {type: 'text', className: 'list_item_edit_input', value: title});
        el.parentElement.appendChild(input);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                el.innerText = e.target.value;
                ToDoList.list = ToDoList.list.map(i => {
                    if (i.id === el.parentElement.id) {
                        i.title = el.innerText;
                    }
                    return i;
                });
                saveInLocalStorage('ToDoList', ToDoList);
                e.target.remove();
            }
        });
    };

    createFooter() {
        const footerContainer = createEl('div', {className: 'footer_cont', id: 'footer_cont'});
        const footerCounter = createEl('span', {className: 'footer_count_cont', id: 'itemsCount'});
        const footerBtnCont = createEl('div', {className: 'footer_btn_cont'});

        footerContainer.appendChild(footerCounter);
        footerContainer.appendChild(footerBtnCont);

        return footerContainer;
    }
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
}
