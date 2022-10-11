import Store from './js/Store';
import Template from './js/Template';
import View from './js/View';
import Controller from './js/Controller';
import './sass/all.scss';
import {getUserLoggedIn} from "./api/services/login";
import {PAGE_PATHS} from "./js/constants";
import {changeLocationTo} from "./js/utils";

const onLogin = () => {
    const username = document.forms['loginForm']['username'].value;
    const password = document.forms['loginForm']['password'].value;
    getUserLoggedIn(username, password, (result) => {
        localStorage.setItem('sessionData', result);
        changeLocationTo(PAGE_PATHS.INDEX);
    });
}

const renderAppPage = () => {
    const token = JSON.parse(localStorage.getItem('sessionData'))?.token;
    if(!token) {
        if(window.location.pathname !== PAGE_PATHS.LOGIN) {
            changeLocationTo(PAGE_PATHS.LOGIN)
        }
        document.getElementById('login_btn').addEventListener('click', onLogin);

    } else {
        changeLocationTo(PAGE_PATHS.INDEX)
        const store = new Store('todoList');
        const template = new Template();
        const view = new View(template);
        const controller = new Controller(view, store);

        const setView = () => controller.setView(document.location.hash);

        window.addEventListener('load', setView);
        window.addEventListener('hashchange', setView);
    }
}

renderAppPage();
