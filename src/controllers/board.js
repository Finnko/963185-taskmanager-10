import {removeElement, renderComponent, RenderPosition, replaceComponent} from "../utils/render";
import TaskComponent from "../components/task";
import TaskFormComponent from "../components/task-form";
import TasksComponent from '../components/tasks';
import NoTasksComponent from "../components/no-tasks";
import SortComponent from '../components/sort';
import LoadMoreButtonComponent from '../components/button-load-more';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceEditToTask = () => {
    replaceComponent(taskComponent, taskFormComponent);
  };

  const replaceTaskToEdit = () => {
    replaceComponent(taskFormComponent, taskComponent);
  };

  const taskComponent = new TaskComponent(task);

  taskComponent.setEditButtonClickHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskFormComponent = new TaskFormComponent(task);
  taskFormComponent.setSubmitHandler(replaceEditToTask);

  renderComponent(taskListElement, taskComponent, RenderPosition.BEFOREEND);
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }

  render(tasks) {
    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      renderComponent(container, this._noTasksComponent, RenderPosition.BEFOREEND);
      return;
    }

    renderComponent(container, this._sortComponent, RenderPosition.BEFOREEND);
    renderComponent(container, this._tasksComponent, RenderPosition.BEFOREEND);

    const taskListElement = this._tasksComponent.getElement();

    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    tasks.slice(0, showingTasksCount)
      .forEach((task) => {
        renderTask(taskListElement, task);
      });

    renderComponent(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = showingTasksCount;
      showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      tasks.slice(prevTasksCount, showingTasksCount)
        .forEach((task) => renderTask(taskListElement, task));

      if (showingTasksCount >= tasks.length) {
        removeElement(this._loadMoreButtonComponent);
      }
    });
  }
}
