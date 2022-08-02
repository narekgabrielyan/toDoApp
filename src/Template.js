class Template {
    itemsList(items) {
        return items.reduce((a, i) => {
            return a + `
                <li class="${i.completed ? 'list_item list_item--done' : 'list_item'}" id="${i.id}">
                    <div class="list_item_content">
                        <input type="checkbox" class="toggle_item" id="toggle${i.id}" ${i.completed ? 'checked' : ''}>
                        <label for="toggle${i.id}" class="toggle_item-checkbox lv_icon--unchecked"></label>
                        <span class="list_item_title">${i.title}</span>
                        <button class="list_item_cancel-btn lv_icon--cancel"></button>
                    </div>
                </li>
        `}, '');
    }
}