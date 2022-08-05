import Store from './Store';
import Template from './Template';
import View from './View';
import Controller from './Controller';
import css from '../styles.css';

const store = new Store('todoList');
const template = new Template();
const view = new View(template);
const controller = new Controller(view, store);

const setView = () => controller.setView(document.location.hash);

window.addEventListener('load', setView);
window.addEventListener('hashchange', setView);