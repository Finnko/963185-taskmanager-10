import {createMenuTemplate} from "./components/menu";
import {createFilterTemplate} from "./components/filter";
import {createBoardTemplate} from "./components/board";
import {createTaskTemplate} from "./components/task";
import {createEditTaskTemplate} from "./components/task-form";
import {createButtonTemplate} from "./components/button-load-more";
import {generateTasks} from "./mocks/task";
import {generateFilters} from "./mocks/filter";

const TASK_COUNT = 25;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.control`);

const renderComponent = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

renderComponent(siteHeaderElement, createMenuTemplate());

const filters = generateFilters();
renderComponent(siteMainElement, createFilterTemplate(filters));
renderComponent(siteMainElement, createBoardTemplate());

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
const tasks = generateTasks(TASK_COUNT);

renderComponent(taskListElement, createEditTaskTemplate(tasks[0]));
let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
tasks.slice(1, showingTasksCount).forEach((task) => renderComponent(taskListElement, createTaskTemplate(task)));

const boardElement = siteMainElement.querySelector(`.board`);
renderComponent(boardElement, createButtonTemplate());

const loadMoreButton = boardElement.querySelector(`.load-more`);
loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount)
    .forEach((task) => renderComponent(taskListElement, createTaskTemplate(task)));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
