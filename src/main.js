import API from './api.js';
import BoardComponent from './components/board';
import BoardController from "./controllers/board";
import FilterController from './controllers/filter.js';
import MenuComponent, {MenuItem} from './components/menu';
import StatisticsComponent from './components/statistics.js';
import TasksModel from './models/tasks';
import {renderComponent, RenderPosition} from "./utils/render";

const AUTHORIZATION = `Basic dXNlckdfreNzd29yZAo=`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/task-manager`;

const dateTo = new Date();
const dateFrom = (() => {
  const d = new Date(dateTo);
  d.setDate(d.getDate() - 7);
  return d;
})();

const api = new API(END_POINT, AUTHORIZATION);
const tasksModel = new TasksModel();

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.control`);

const menuComponent = new MenuComponent();
const statisticsComponent = new StatisticsComponent({tasks: tasksModel, dateFrom, dateTo});

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent, tasksModel, api);
const filterController = new FilterController(siteMainElement, tasksModel);

renderComponent(siteHeaderElement, menuComponent, RenderPosition.BEFOREEND);
filterController.render();
renderComponent(siteMainElement, boardComponent, RenderPosition.BEFOREEND);
renderComponent(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hide();

menuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      menuComponent.setActiveItem(MenuItem.TASKS);
      statisticsComponent.hide();
      boardController.show();
      boardController.createTask();
      break;
    case MenuItem.STATISTICS:
      boardController.hide();
      statisticsComponent.show();
      break;
    case MenuItem.TASKS:
      statisticsComponent.hide();
      boardController.show();
      break;
  }
});

api.getTasks()
  .then((tasks) => {
    tasksModel.setTasks(tasks);
    boardController.render();
  });
