class View {
    constructor() {
        this.newToDo = createEl('input', {id: 'newTodo'});
    }

    bindAddItem(callback) {
        this.newToDo.addEventListener('change', (e) => {
            callback(e.target.value);
        })
    }
}