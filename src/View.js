class View {
    constructor(template) {
        this.listWrapper = qs('.list_cont');
        this.newTodo = qs('.new-todo');

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

    clearNewTodo() {
        this.newTodo.value = '';
    }

    showItems(items) {
        this.listWrapper.innerHTML = this.template.itemsList(items);
    }
}