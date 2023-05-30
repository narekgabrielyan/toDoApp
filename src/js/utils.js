/**
 * @typedef loginData
 * @property access_token
 */

export function createEl(tagName, props = {}) {
  const el = document.createElement(tagName);
  Object.assign(el, props);
  Object.assign(el.style, props.style);
  return el;
}

export function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

export function qsAll(selector, scope = document) {
  return scope.querySelectorAll(selector);
}

export function getTargetedItemId(target) {
  return target.parentElement.id || target.parentElement.parentElement.id;
}

export function delegateEvent(target, selector, type, handler, capture) {
  const dispatchEvent = (e) => {
    const targetElement = e.target;
    const potentialElements = qsAll(selector, target);
    let elementsCount = potentialElements.length;

    while (elementsCount--) {
      if (potentialElements[elementsCount] === targetElement) {
        handler.call(targetElement, e);
      }
    }
  };

  target.addEventListener(type, dispatchEvent, capture);
}

export const escapeForHTML = (s) =>
  s.replace(/[&<]/g, (c) => (c === "&" ? "&amp;" : "&lt;"));

export const escapeForHTMLAttributes = (s) =>
  s.replace(/'/g, "&apos;").replace(/"/g, "&quot;");

export function getStringAfterMatchedPhrase(str, phrase, len) {
  const reg = RegExp(phrase, "i");
  const startIndex = str.search(reg) + phrase.length;
  const endIndex = startIndex + len;
  return str.slice(startIndex, endIndex);
}

export const removeFromStorage = (...items) => {
  items.forEach((item) => localStorage.removeItem(item));
};

export const useIsUserLoggedIn = () => {
  // //debugger;
  /**
   * TODO: review me
   */
  const { loginStatusId } = JSON.parse(localStorage.loginData || "{}");

  return loginStatusId === 1;
};

export const getAccessToken = () => {
  return JSON.parse(localStorage.loginData)?.access_token;
};
