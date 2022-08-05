export function createEl(tagName, props = {}) {
    const el = document.createElement(tagName);
    Object.assign(el, props);
    Object.assign(el.style, props.style);
    return el;
}

export function qs(selector, scope) {
    return (scope || document).querySelector(selector);
}

export function qsAll(selector, scope) {
    return (scope || document).querySelectorAll(selector);
}

export function getTargetedItemId(target) {
    return target.parentElement.id || target.parentElement.parentElement.id;
}

export function delegateEvent(target, selector, type, handler, capture) {
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