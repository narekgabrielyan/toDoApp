
function createEl(tagName, props) {
    const el = document.createElement(tagName);
    Object.assign(el, props);
    Object.assign(el.style, props.style);
    return el;
}

function getParsedDataFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function saveInLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function localStorageHasItem(key) {
    return localStorage.getItem(key) !== null;
}

function guidGenerator() {
    const S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

function addBtnListener(btn, fn) {
    this.addEventListener('keypress', (e) => {
        if(e.key === btn) {
            fn(e);
        }
    })
}