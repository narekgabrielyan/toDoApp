import {escapeForHTML, escapeForHTMLAttributes} from "./utils";

export default class Template {
    itemsList(items) {
        return items.reduce((a, i) => {
            return a + `
                <li class="${i.completed ? 'list_item list_item-done' : 'list_item'}" id="${i.id}">
                    <div class="list_item_content flex align-center justify-center">
                        <input type="checkbox" class="toggle_item pointer" id="toggle${i.id}" ${i.completed ? 'checked' : ''}>
                        <label for="toggle${i.id}" class="checkbox-toggle_item pointer"></label>
                        <span class="list_item_title" title="${escapeForHTMLAttributes(i.title)}">${escapeForHTML(i.title)}</span>
                        <button class="btn-list_item btn-list_item-edit icon-edit flex align-center justify-center pointer" title="Click to edit"></button>
                        <button class="btn-list_item btn-list_item-cancel icon-remove flex align-center justify-center pointer" title="Click to remove"></button>
                    </div>
                </li>
        `}, '');
    }
}