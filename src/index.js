import Store from './js/Store';
import Template from './js/Template';
import View from './js/View';
import Controller from './js/Controller';
import './sass/all.scss';
import {getUserLogIn} from "./api/services/login";
import {getUserLogOut} from "./api/services/logout";

const store = new Store('todoList');
const template = new Template();
const view = new View(template);
const controller = new Controller(view, store);

const setView = () => controller.setView(document.location.hash);

window.addEventListener('load', setView);
window.addEventListener('hashchange', setView);

document.querySelector('.login_btn').addEventListener('click', getUserLogIn);
document.querySelector('.logout_btn').addEventListener('click', getUserLogOut);