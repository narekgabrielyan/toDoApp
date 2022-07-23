const containerEl = document.getElementById('testId');
const newView = new View(containerEl);
const newStore = new Store('todoList');
const newController = new Controller('', newView, newStore);