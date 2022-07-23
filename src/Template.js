class Template {
    itemsList(items) {
        return items.reduce((a, i) => {
            return a + `
                <li class="list_item ${i.completed ? 'list_item--done' : ''}" id="${i.id}">
                    <div class="list_item_content">
                        <input type="checkbox" id="toggle${i.id}" ${i.completed ? 'checked' : ''}>
                        <label for="toggle${i.id}" class="${i.completed ? 'lv_icon--checked' : 'lv_icon--unchecked'}"></label>
                        <span class="list_item_title">${i.title}</span>
                        <button class="list_item_cancel-btn lv_icon--cancel"></button>
                    </div>
                </li>
        `}, '');
    }
}