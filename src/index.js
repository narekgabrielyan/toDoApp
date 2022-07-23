const containerEl = document.getElementById('testId');
const newTemplate = new Template();
const newView = new View(newTemplate);
const newStore = new Store('todoList');
const newController = new Controller(newView, newStore);