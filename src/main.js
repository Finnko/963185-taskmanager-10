import {createMenuTemplate} from "./components/menu";
import {createFilterTemplate} from "./components/filter";
import {createBoardTemplate} from "./components/board";
import {createTaskTemplate} from "./components/task";
import {createEditTaskTemplate} from "./components/task-form";
import {createButtonTemplate} from "./components/button-load-more";

const TASK_COUNT = 3;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.control`);

const renderComponent = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const repeat = (count, fn) => {
  Array(count).fill(``).forEach(fn);
};

renderComponent(siteHeaderElement, createMenuTemplate());
renderComponent(siteMainElement, createFilterTemplate());
renderComponent(siteMainElement, createBoardTemplate());

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
renderComponent(taskListElement, createEditTaskTemplate());

repeat(TASK_COUNT, () => {
  renderComponent(taskListElement, createTaskTemplate());
});

const boardElement = siteMainElement.querySelector(`.board`);
renderComponent(boardElement, createButtonTemplate());
