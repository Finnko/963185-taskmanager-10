import BoardComponent from './components/board';
import BoardController from "./controllers/board";
import FilterComponent from './components/filter';
import MenuComponent from './components/menu';
import TasksModel from './models/task';
import {generateFilters} from "./mocks/filter";
import {tasksData} from "./mocks/task";
import {renderComponent, RenderPosition} from "./utils/render";

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.control`);
renderComponent(siteHeaderElement, new MenuComponent(), RenderPosition.BEFOREEND);

const filters = generateFilters();
renderComponent(siteMainElement, new FilterComponent(filters), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
renderComponent(siteMainElement, boardComponent, RenderPosition.BEFOREEND);

const tasksModel = new TasksModel();
tasksModel.setTasks(tasksData);

const boardController = new BoardController(boardComponent, tasksModel);
boardController.render();
