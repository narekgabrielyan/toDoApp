class View {
    constructor(container) {
        const appWrapper = createEl('div', {className: 'wrapper flex flex-column align-center', id: 'container'});
        const newTodo = createEl('input', {id: 'newTodo', type: 'text'});

        this.containerEl = container;
        this.appWrapper = appWrapper;
        this.newTodo = newTodo;
    }

    bindAddItem(callback) {
        this.newTodo.addEventListener('change', (e) => {
            callback(e.target.value);
        })
    }

    clearNewTodo() {
        this.newTodo.value = '';
    }

    setView(callback) {
        const {containerEl, appWrapper, newTodo} = this;
        appWrapper.appendChild(newTodo);
        containerEl.appendChild(appWrapper);

        if(callback) {
            callback();
        }
    }
}