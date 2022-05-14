/**
 *
 */
class ToDoApp {
    constructor(containerElement) {
        this.containerElement = containerElement;
        this.todoList = [];
        this.init();
    }

    init() {
        /**
         * TODO: try to move
         */
        window.addEventListener('load', () => this.updateList());

        this.createHTML();

        addBtnListener.call(this.input, 'Enter', (e) => {
            this.onInputEntered(e.target.value);
            e.target.value = '';
        });
        this.checkAllBtn.addEventListener('click', () => this.toggleAllItems());
    }

    createHTML() {
        /**
         * TODO: refactor variables creation logic. / TODO: review
         */
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

        this.appWrapper = appWrapper;
        this.listWrapper = listWrapper;
        this.inputWrapper = inputWrapper;
        this.checkAllBtn = checkAllBtn;
        this.input = input;
        inputWrapper.appendChild(checkAllBtn);
        inputWrapper.appendChild(input);
        appWrapper.appendChild(inputWrapper);
        appWrapper.appendChild(listWrapper);
    }

    onInputEntered(title) {
        const newItem = this.createItem(title);
        this.addItemActions(newItem);
        this.addItem(newItem);
    }

    createItem(title) {
        return new ToDoItem(title);
    }

    addItem(item) {
        this.todoList.push(item);
        this.listWrapper.append(item.elements.wrapper);
    }

    removeItem(item) {
        this.todoList = this.todoList.filter(i => i !== item);
        item.onCancel();
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

        elements.cancelBtn.addEventListener('click', () => this.removeItem(item));
        elements.checkLabel.addEventListener('click', () => this.toggleItem(item));
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
        }
    }

    start() {
        this.containerElement.appendChild(this.appWrapper);
    }

    /**
     * TODO: review
     */
    destroy() {
        this.appWrapper.remove();
    }

    /**
     * TODO: try to separate concerns
     */


    updateList() {
        const {todoList, listWrapper} = this;

        listWrapper.innerHTML = "";
        // const inputArrow = this.inputWrapper.querySelector('.lv_icon--arrow');
        //
        // if (localStorageHasItem('ToDoList')) {
        //     let listItems;
        //     const ToDoList = getParsedDataFromStorage('ToDoList');
        //     const activeItemsCount = ToDoList.list.filter(i => i.done === false).length;
        //     const allItemsChecked = ToDoList.list.filter(i => i.done === true).length === ToDoList.list.length;
        //     const counterTxt = activeItemsCount === 1 ? 'item left.' : 'items left.';
        //     const sortBy = ToDoList.sortBy;
        //
        //     switch (+sortBy) {
        //         case 1:
        //             listItems = ToDoList.list;
        //             break;
        //         case 2:
        //             listItems = ToDoList.list.filter(i => i.done === false);
        //             break;
        //         case 3:
        //             listItems = ToDoList.list.filter(i => i.done === true);
        //             break;
        //         default:
        //             listItems = ToDoList.list;
        //     }
        //
        //     listItems.forEach(item => {
        //         /**
        //          * TODO: refactor name
        //          * @type {any}
        //          */
        //         const listItem = createEl('div', {id: item.id, className: 'list_item'});
        //         const checkBoxId = guidGenerator();
        //         const itemCheckBox = createEl('input', {type: 'checkbox', id: checkBoxId, checked: item.done});
        //         const labelCn = item.done ? 'lv_icon--checked' : 'lv_icon--unchecked';
        //         const itemLabel = createEl('label', {className: labelCn, htmlFor: checkBoxId});
        //         const itemTxt = createEl('span', {textContent: item.title});
        //         const itemCancelBtn = createEl('button', {className: 'item_cancel lv_icon--cancel'});
        //
        //         itemCancelBtn.onclick = (e) => {
        //             const parentId = e.target.parentElement.id;
        //             this.cancel(parentId);
        //         }
        //         itemCheckBox.onchange = (e) => {
        //             const parentId = e.target.parentElement.id;
        //             this.onComplete(parentId);
        //             this.updateList();
        //         };
        //         itemTxt.ondblclick = (e) => {
        //             const element = e.target;
        //             this.edit(element);
        //         };
        //
        //         listItem.appendChild(itemCheckBox);
        //         listItem.appendChild(itemLabel);
        //         listItem.appendChild(itemTxt);
        //         listItem.appendChild(itemCancelBtn);
        //         listWrapper.appendChild(listItem);
        //     });
        //
        //     if (!this.appWrapper.querySelector('#footer_cont')) {
        //         this.appWrapper.appendChild(this.createFooter());
        //     }
        //     if (inputArrow.className.includes('active') && !allItemsChecked) {
        //         inputArrow.classList.remove('active');
        //     } else if (!inputArrow.className.includes('active') && allItemsChecked) {
        //         inputArrow.classList.add('active');
        //     }
        //
        //     this.appWrapper.querySelector('#itemsCount').innerText = `${activeItemsCount} ${counterTxt}`;
        //
        //     this.appWrapper.querySelector('.footer_btn_cont').childNodes.forEach(b => {
        //         if (b.dataset.index !== sortBy && b.className.includes('active')) {
        //             b.classList.remove('active');
        //         } else if (b.dataset.index === sortBy && !b.className.includes('active')) {
        //             b.classList.add('active');
        //         }
        //     })
        // } else {
        //     if (inputArrow.className.includes('active')) {
        //         inputArrow.classList.remove('active');
        //     }
        // }
        if (todoList.length) {
            todoList.forEach(item => listWrapper.appendChild(item.elements.wrapper));
        }
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
        const sortBy = [
            {
                index: 1,
                content: 'all'
            },
            {
                index: 2,
                content: 'active'
            },
            {
                index: 3,
                content: 'completed'
            }
        ];

        sortBy.forEach(i => {
            const btn = createEl('button', {innerText: i.content});
            btn.dataset.index = i.index;
            btn.addEventListener('click', (e) => {
                const ToDoList = getParsedDataFromStorage('ToDoList');
                ToDoList.sortBy = e.target.dataset.index;
                saveInLocalStorage('ToDoList', ToDoList);
                e.target.parentElement.childNodes.forEach(b => {
                    if (b.className.includes('active')) {
                        b.classList.remove('active');
                    }
                });
                e.target.classList.add('active');
                this.updateList(this.listWrapper);
            })
            footerBtnCont.appendChild(btn);
        })
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

        this.elements = {wrapper, checkInput, checkLabel, titleSpan, cancelBtn};

        wrapper.append(checkInput, checkLabel, titleSpan, cancelBtn);
    }

    onCancel() {
        this.elements.wrapper.remove();
    }
}
