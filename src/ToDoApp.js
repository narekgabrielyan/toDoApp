/**
 *
 */
class ToDoApp {
    constructor(containerElement) {
        this.containerElement = containerElement;
        this.init();
    }

    init() {
        const { containerElement } = this;

        /**
         * TODO: refactor variables creation logic.
         */
        this.appWrapper = createEl('div', {className: 'wrapper flex flex-column align-center', id: 'container'});
        this.listWrapper = createEl('div', {className: 'list_cont flex flex-column', id: 'list_cont'});
        this.inputWrapper = createEl('div', {className: 'input_cont flex" id="input_cont', id: 'input_cont'});

        const appWrapper = this.appWrapper;
        const listWrapper = this.listWrapper;
        const inputWrapper = this.inputWrapper;
        const checkAllBtn = createEl('i', {className: 'lv_icon--arrow'});
        const input = createEl('input', {id: 'input', type: 'text', autofocus: true, autocomplete: 'off', placeholder: 'What needs to be done?'});

        checkAllBtn.addEventListener('click', () => {
            this.completeAll();
        })
        input.addEventListener('keypress', (e) => {
            /**
             * TODO: try to optimise
             */
            if(e.key === 'Enter' && e.target.value.length > 0) {
                this.createItem(e.target.value);
                this.updateList();
                e.target.value = '';
            }
        });
        inputWrapper.appendChild(checkAllBtn);

        /**
         * TODO: try to move
         */
        window.addEventListener('load', () => this.updateList());
        inputWrapper.appendChild(input);
        appWrapper.appendChild(inputWrapper);
        appWrapper.appendChild(listWrapper);
        containerElement.appendChild(appWrapper);
        // this.updateList();
    }

    /**
     * TODO: try to separate concerns
     * @param title
     */
    createItem(title) {
        // const todoItem = new ToDoItem(title);
        const newItem = { title, id: guidGenerator(), done: false };
        /**
         * TODO: localStorage service
         * @type {any|{sortBy: number, list: *[]}}
         */
        const ToDoList = localStorageHasItem('ToDoList') ? JSON.parse(localStorage.getItem('ToDoList')) : { list: [], sortBy: 1 };

        ToDoList.list.push(newItem);
        saveInLocalStorage('ToDoList', ToDoList);
    }

    updateList() {
        const { listWrapper } = this;

        listWrapper.innerHTML = "";
        const inputArrow = this.inputWrapper.querySelector('.lv_icon--arrow');

        if(localStorageHasItem('ToDoList')) {
            let listItems;
            const ToDoList = getParsedDataFromStorage('ToDoList');
            const activeItemsCount = ToDoList.list.filter(i => i.done === false).length;
            const allItemsChecked = ToDoList.list.filter(i => i.done === true).length === ToDoList.list.length;
            const counterTxt = activeItemsCount === 1 ? 'item left.' : 'items left.';
            const sortBy = ToDoList.sortBy;

            switch(+sortBy) {
                case 1:
                    listItems = ToDoList.list;
                    break;
                case 2:
                    listItems = ToDoList.list.filter(i => i.done === false);
                    break;
                case 3:
                    listItems = ToDoList.list.filter(i => i.done === true);
                    break;
                default:
                    listItems = ToDoList.list;
            }

            listItems.forEach(item => {
                /**
                 * TODO: refactor name
                 * @type {any}
                 */
                const listItem = createEl('div', {id: item.id, className: 'list_item'});
                const checkBoxId = guidGenerator();
                const itemCheckBox = createEl('input', {type: 'checkbox', id: checkBoxId, checked: item.done});
                const labelCn = item.done ? 'lv_icon--checked' : 'lv_icon--unchecked';
                const itemLabel = createEl('label', {className: labelCn, htmlFor: checkBoxId});
                const itemTxt = createEl('span', {textContent: item.title});
                const itemCancelBtn = createEl('button', {className: 'item_cancel lv_icon--cancel'});

                itemCancelBtn.onclick = (e) => {
                    const parentId = e.target.parentElement.id;
                    this.cancel(parentId);
                }
                itemCheckBox.onchange = (e) => {
                    const parentId = e.target.parentElement.id;
                    this.onComplete(parentId);
                    this.updateList();
                };
                itemTxt.ondblclick = (e) => {
                    const element = e.target;
                    this.edit(element);
                };

                listItem.appendChild(itemCheckBox);
                listItem.appendChild(itemLabel);
                listItem.appendChild(itemTxt);
                listItem.appendChild(itemCancelBtn);
                listWrapper.appendChild(listItem);
            });

             if(!this.appWrapper.querySelector('#footer_cont')) {
                this.appWrapper.appendChild(this.createFooter());
            }
            if(inputArrow.className.includes('active') && !allItemsChecked) {
                inputArrow.classList.remove('active');
            } else if(!inputArrow.className.includes('active') && allItemsChecked) {
                inputArrow.classList.add('active');
            }

            this.appWrapper.querySelector('#itemsCount').innerText = `${activeItemsCount} ${counterTxt}`;

            this.appWrapper.querySelector('.footer_btn_cont').childNodes.forEach(b => {
                if(b.dataset.index !== sortBy && b.className.includes('active')) {
                    b.classList.remove('active');
                } else if (b.dataset.index === sortBy && !b.className.includes('active')) {
                    b.classList.add('active');
                }
            })
        } else {
            if(inputArrow.className.includes('active')) {
                inputArrow.classList.remove('active');
            }
        }
    }

    edit(el) {
        const ToDoList = getParsedDataFromStorage('ToDoList');
        const title = el.innerText;
        const input = createEl('input', {type: 'text', className: 'list_item_edit_input', value: title});
        el.parentElement.appendChild(input);
        input.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') {
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

    cancel(id) {
        const ToDoList = getParsedDataFromStorage('ToDoList');
        ToDoList.list = ToDoList.list.filter(i => i.id !== id);
        if(ToDoList.list.length > 0) {
            saveInLocalStorage('ToDoList', ToDoList);
        } else {
            localStorage.clear();
            this.appWrapper.querySelector('#footer_cont').remove();
        }
        this.updateList(this.listWrapper);
    }

    onComplete(id) {
        const ToDoList = getParsedDataFromStorage('ToDoList');
        ToDoList.list.map(i => {
            if(i.id === id) {
                i.done = !i.done;
            }
            return i;
        });
        saveInLocalStorage('ToDoList', ToDoList);
    }

    completeAll() {
        if(localStorageHasItem('ToDoList')) {
            const data = getParsedDataFromStorage('ToDoList');
            const allChecked = data.list.filter(i => i.done === true).length === data.list.length;

            data.list = data.list.map(i => {
                i.done = !allChecked;
                return i;
            });

            saveInLocalStorage('ToDoList', data);
            this.updateList(this.listWrapper);
        }
    }

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
                    if(b.className.includes('active')) {
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

