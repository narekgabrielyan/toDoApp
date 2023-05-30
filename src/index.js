import Store from "./js/Store";
import Template from "./js/Template";
import View from "./js/View";
import Controller from "./js/Controller";
import "./sass/all.scss";
import { login } from "./api/services/login";
import { getUserLogOut } from "./api/services/logout";
import { removeFromStorage } from "./js/utils";

const store = new Store("todoList");
const template = new Template();
const view = new View(template);
const controller = new Controller(view, store);

const setView = () => {
  console.log("setView");
  controller.setView(document.location);
};

window.addEventListener("load", setView);
window.addEventListener("hashchange", setView);

const loginBtn = document.querySelector(".login_btn");

loginBtn.addEventListener("click", function () {
  window.open(
    "https://todoist.com/oauth/authorize?client_id=a3dea492df0b4726aeccc93df12d8415&scope=data:read_write,data:delete&state=f478a4e4da994a9da2e579e9d997285a",
    "_self"
  );
});
