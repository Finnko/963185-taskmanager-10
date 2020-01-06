import BoardComponent from './components/board';
import BoardController from "./controllers/board";
import FilterController from './controllers/filter.js';
import MenuComponent, {MenuItem} from './components/menu';
import StatisticsComponent from './components/statistics.js';
import TasksModel from './models/task';
import {tasksData} from "./mocks/task";
import {renderComponent, RenderPosition} from "./utils/render";

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.control`);

const menuComponent = new MenuComponent();
const statisticsComponent = new StatisticsComponent();

renderComponent(siteHeaderElement, menuComponent, RenderPosition.BEFOREEND);

const tasksModel = new TasksModel();
tasksModel.setTasks(tasksData);

const filterController = new FilterController(siteMainElement, tasksModel);
filterController.render();

const boardComponent = new BoardComponent();
renderComponent(siteMainElement, boardComponent, RenderPosition.BEFOREEND);
renderComponent(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);

const boardController = new BoardController(boardComponent, tasksModel);

statisticsComponent.hide();
boardController.render();

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
