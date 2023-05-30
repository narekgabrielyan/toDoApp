import { CLIENT_DATA, QUERIES } from "./constants";
import {
  useIsUserLoggedIn,
  getStringAfterMatchedPhrase,
  removeFromStorage,
} from "./utils";
import { login } from "../api/services/login";
import { addTodoItem } from "../api/services/addTodoItem";
import { updateTodoItem } from "../api/services/updateTodoItem";
import { removeTodoItem } from "../api/services/removeTodoItem";
import { getTodoItems } from "../api/services/getTodoItems";

export default class Controller {
  constructor(view, store) {
    this.activeRoute = "";
    this.lastActiveRoute = null;
    this.view = view;
    this.store = store;

    view.bindAddItem(this.addItem.bind(this));
    view.bindToggleItem((id, completed) => {
      this.toggleItem(id, completed);
      this.filter();
    });
    view.bindRemoveItem(this.removeItem.bind(this));
    view.bindClearCompletedItems(this.clearCompletedItems.bind(this));
    view.bindToggleAll(this.toggleAll.bind(this));
    view.bindEditItemCancel(this.editItemCancel.bind(this));
    view.bindEditItemSave(this.editItemSave.bind(this));
    view.bindLogoutUser(this.getUserLoggedOut);
    view.toggleAuthBtnVisibility(useIsUserLoggedIn());
  }

  setView(location) {
    const route = location.hash.replace(/^#\//, "");
    this.activeRoute = route;
    this.filter();
    this.view.updateFooterButtons(route);
    if (location.search.includes("code")) {
      const params = location.search;
      // is this the right way to clear the address bar?
      window.history.replaceState(null, null, window.location.origin);
      this.doUserLogin(params);
      this.view.toggleAuthBtnVisibility(useIsUserLoggedIn());
    }
    if (!useIsUserLoggedIn()) {
      // is this the right way to do a cleanup before page load
      localStorage.clear();
      this.filter();
    }
  }

  addItem(title) {
    addTodoItem(title, (newItem) =>
      this.store.addItem(newItem, () => {
        this.view.clearNewTodo();
        this.filter(true);
      })
    );
  }

  removeItem(id) {
    removeTodoItem(id, () =>
      this.store.removeItems({ id }, () => {
        this.filter();
        this.view.removeItem(id);
      })
    );
  }

  toggleItem(id, completed) {
    this.store.updateItem({ id, completed }, () =>
      this.view.setItemCompleted(id, completed)
    );
  }

  toggleAll(checked) {
    this.store.filterItems({ completed: !checked }, (items) => {
      items.forEach((item) => {
        this.toggleItem(item.id, checked);
      });
    });

    this.filter();
  }

  editItemCancel(id) {
    this.store.filterItems({ id }, (items) => {
      const title = items[0].title;
      this.view.editItemDone(id, title);
    });
  }

  editItemSave(id, content) {
    if (content.length) {
      updateTodoItem({ id, content }, (updateItem) =>
        this.store.updateItem({ id, content }, () => {
          this.view.editItemDone(id, content);
        })
      );
    } else {
      this.removeItem(id);
    }
  }

  filter(force) {
    const route = this.activeRoute;

    if (
      useIsUserLoggedIn() &&
      (force || this.lastActiveRoute !== "" || this.lastActiveRoute !== route)
    ) {
      //debugger;
      getTodoItems(() =>
        this.store.filterItems(
          QUERIES[route],
          this.view.showItems.bind(this.view)
        )
      );
    }
    this.store.countItems((total, active, completed) => {
      this.view.setToggleAllCheckedState(completed === total);
      this.view.setActiveItemsCount(active);
      this.view.setMainVisibility(total);
      this.view.setClearCompletedBtnVisibility(completed);
    });

    this.lastActiveRoute = route;
  }

  clearCompletedItems() {
    this.store.removeItems(QUERIES.completed, () => this.filter(true));
  }

  doUserLogin(params) {
    const code = getStringAfterMatchedPhrase(params, "code=", 40);
    const state = getStringAfterMatchedPhrase(params, "state=", 32);

    const userParams = {
      code: code,
      state: state,
    };

    localStorage.setItem("userParams", JSON.stringify(userParams));

    login({
      code,
      clientId: CLIENT_DATA.ID,
      clientSecret: CLIENT_DATA.SECRET,
    }).then((res) => {
      const loginData = JSON.stringify(res);
      console.log("loginData", loginData);
      localStorage.setItem("loginData", loginData);
      this.view.toggleAuthBtnVisibility(useIsUserLoggedIn());
    });
  }

  getUserLoggedOut() {
    removeFromStorage("loginData", "userParams");
    window.open(window.location.origin, "_self");
  }
}
