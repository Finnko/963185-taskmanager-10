import BoardComponent from './components/board';
import BoardController from "./controllers/board";
import FilterController from './controllers/filter.js';
import MenuComponent from './components/menu';
import TasksModel from './models/task';
import {tasksData} from "./mocks/task";
import {renderComponent, RenderPosition} from "./utils/render";

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.control`);

const menuComponent = new MenuComponent();
menuComponent.getElement().querySelector(`.control__label--new-task`)
  .addEventListener(`click`, () => {
    boardController.createTask();
  });

renderComponent(siteHeaderElement, menuComponent, RenderPosition.BEFOREEND);

const tasksModel = new TasksModel();
tasksModel.setTasks(tasksData);

const filterController = new FilterController(siteMainElement, tasksModel);
filterController.render();

const boardComponent = new BoardComponent();
renderComponent(siteMainElement, boardComponent, RenderPosition.BEFOREEND);

const boardController = new BoardController(boardComponent, tasksModel);
boardController.render();
