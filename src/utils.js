
function createEl(tagName, props = {}) {
    const el = document.createElement(tagName);
    Object.assign(el, props);
    Object.assign(el.style, props.style);
    return el;
}

function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function setInStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function localStorageHasItem(key) {
    return localStorage.getItem(key) !== null;
}

function isInputValid(str) {
    return !!str.replace(/\s/g, '');
}

function qs(selector, scope) {
    return (scope || document).querySelector(selector);
}

function qsAll(selector, scope) {
    return (scope || document).querySelectorAll(selector);
}

function getTargetedItemId(target) {
    return target.parentElement.id || target.parentElement.parentElement.id;
}

function delegateEvent(target, selector, type, handler, capture) {
    const dispatchEvent = e => {
        const targetElement = e.target;
        const potentialElements = qsAll(selector, target);
        let elementsCount = potentialElements.length;

        while(elementsCount--) {
            if(potentialElements[elementsCount] === targetElement) {
                handler.call(targetElement, e);
            }
        }
    }

    target.addEventListener(type, dispatchEvent, capture);
}