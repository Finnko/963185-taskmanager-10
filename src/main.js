import BoardComponent from './components/board';
import FilterComponent from './components/filter';
import SortComponent from './components/sort';
import LoadMoreButtonComponent from './components/button-load-more';
import TaskFormComponent from './components/task-form';
import TaskComponent from './components/task';
import TasksComponent from './components/tasks';
import MenuComponent from './components/menu';
import NoTasksComponent from "./components/no-tasks";
import {generateFilters} from "./mocks/filter";
import {tasksData} from "./mocks/task";
import {renderComponent, RenderPosition} from "./utils";


const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const taskFormComponent = new TaskFormComponent(task);

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceEditToTask = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskFormComponent.getElement());
  };

  const replaceTaskToEdit = () => {
    taskListElement.replaceChild(taskFormComponent.getElement(), taskComponent.getElement());
  };

  const taskComponent = new TaskComponent(task);

  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const editForm = taskFormComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskFormComponent.getElement());
  });

  editForm.addEventListener(`submit`, replaceEditToTask);

  renderComponent(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.control`);
renderComponent(siteHeaderElement, new MenuComponent().getElement(), RenderPosition.BEFOREEND);


const filters = generateFilters();
renderComponent(siteMainElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
renderComponent(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);

const isAllTasksArchived = tasksData.every((task) => task.isArchive);

if (isAllTasksArchived) {
  renderComponent(boardComponent.getElement(), new NoTasksComponent().getElement(), RenderPosition.BEFOREEND);
} else {
  renderComponent(boardComponent.getElement(), new TasksComponent().getElement(), RenderPosition.BEFOREEND);
  renderComponent(boardComponent.getElement(), new SortComponent().getElement(), RenderPosition.BEFOREEND);
  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
  tasksData.slice(0, showingTasksCount)
    .forEach((task) => {
      renderTask(taskListElement, task);
    });

  const loadMoreButtonComponent = new LoadMoreButtonComponent();
  renderComponent(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    tasksData.slice(prevTasksCount, showingTasksCount)
      .forEach((task) => renderTask(taskListElement, task));

    if (showingTasksCount >= tasksData.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
}


