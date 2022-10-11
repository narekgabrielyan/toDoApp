import Store from './js/Store';
import Template from './js/Template';
import View from './js/View';
import Controller from './js/Controller';
import './sass/all.scss';
import {getUserLoggedIn} from "./api/services/login";

const generateLoginLogic = () => {
    document.getElementById('login_btn').addEventListener('click', () => {
        const username = document.forms['loginForm']['username'].value;
        const password = document.forms['loginForm']['password'].value;
        getUserLoggedIn(username, password, (result) => {
            localStorage.setItem('sessionData', result);
        });
    })
}

const renderAppPage = () => {
    const token = JSON.parse(localStorage.getItem('sessionData'))?.token;
    if(!token) {
        if(window.location.pathname !== '/login.html') {
            window.location.href = '/login.html';
        }
        generateLoginLogic();
    } else {
        window.location.href = '/#/'
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
