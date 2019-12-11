import BoardComponent from './components/board';
import FilterComponent from './components/filter';
import LoadMoreButtonComponent from './components/button-load-more';
import TaskFormComponent from './components/task-form';
import TaskComponent from './components/task';
import MenuComponent from './components/menu';
import {generateFilters} from "./mocks/filter";
import {tasksData} from "./mocks/task";
import {renderComponent, RenderPosition} from "./utils";

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;


const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.control`);

renderComponent(siteHeaderElement, new MenuComponent().getElement(), RenderPosition.BEFOREEND);


const filters = generateFilters();
renderComponent(siteMainElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);


const boardComponent = new BoardComponent();
renderComponent(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);

const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);
renderComponent(taskListElement, new TaskFormComponent(tasksData[0]).getElement(), RenderPosition.BEFOREEND);


let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
tasksData.slice(1, showingTasksCount)
  .forEach((task) => renderComponent(taskListElement, new TaskComponent(task).getElement(), RenderPosition.BEFOREEND));


const loadMoreButtonComponent = new LoadMoreButtonComponent();
renderComponent(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

  tasksData.slice(prevTasksCount, showingTasksCount)
    .forEach((task) => renderComponent(taskListElement, new TaskComponent(task).getElement(), RenderPosition.BEFOREEND));

  if (showingTasksCount >= tasksData.length) {
    loadMoreButtonComponent.getElement().remove();
    loadMoreButtonComponent.removeElement();
  }
});
