import Store from './js/Store';
import Template from './js/Template';
import View from './js/View';
import Controller from './js/Controller';
import './sass/all.scss';
import { getUserLoggedIn } from './api/services/login';
import { PAGE_PATHS } from './js/constants';
import {
  changeLocationTo,
  createEl,
  outsideClickHandler,
  setDataToLocalStorage,
} from './js/utils';

const onLogin = () => {
  const username = document.forms['loginForm']['username'].value;
  const password = document.forms['loginForm']['password'].value;
  getUserLoggedIn(username, password, (result) => {
    if (result?.error) {
      const errorMsg = createEl('span', {
        innerText: 'Invalid username or password',
        className: 'error_msg',
      });
      document.getElementById('loginFormContent').appendChild(errorMsg);
      outsideClickHandler(errorMsg, () => errorMsg.remove());
    } else {
      setDataToLocalStorage('userData', result);
      changeLocationTo(PAGE_PATHS.INDEX);
    }
  });
};

const renderApp = () => {
  const token = JSON.parse(localStorage.getItem('userData'))?.token;
  if (!token) {
    if (window.location.pathname !== PAGE_PATHS.LOGIN) {
      changeLocationTo(PAGE_PATHS.LOGIN);
    }
    document.getElementById('login_btn').addEventListener('click', onLogin);
  } else {
    if (window.location.pathname === PAGE_PATHS.LOGIN) {
      debugger;
      changeLocationTo(PAGE_PATHS.INDEX);
    }
    if (window.location.pathname === PAGE_PATHS.INDEX) {
      const store = new Store('todoList');
      const template = new Template();
      const view = new View(template);
      const controller = new Controller(view, store);

      const setView = () => controller.setView(document.location.hash);

      window.addEventListener('load', setView);
      window.addEventListener('hashchange', setView);
    }
  }
};

window.addEventListener('load', renderApp);
