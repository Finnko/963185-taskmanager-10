import {createMenuTemplate} from "./components/menu";
import {createFilterTemplate} from "./components/filter";
import {createBoardTemplate} from "./components/board";
import {createTaskTemplate} from "./components/task";
import {createEditTaskTemplate} from "./components/task-form";
import {createButtonTemplate} from "./components/button-load-more";
import {generateFilters} from "./mocks/filter";
import {tasksData} from "./mocks/task";

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

renderComponent(taskListElement, createEditTaskTemplate(tasksData[0]));
let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
tasksData.slice(1, showingTasksCount).forEach((task) => renderComponent(taskListElement, createTaskTemplate(task)));

const boardElement = siteMainElement.querySelector(`.board`);
renderComponent(boardElement, createButtonTemplate());

const loadMoreButton = boardElement.querySelector(`.load-more`);
loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

  tasksData.slice(prevTasksCount, showingTasksCount)
    .forEach((task) => renderComponent(taskListElement, createTaskTemplate(task)));

  if (showingTasksCount >= tasksData.length) {
    loadMoreButton.remove();
  }
});
