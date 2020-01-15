import TaskComponent from '../components/task.js';
import TaskFormComponent from '../components/task-form.js';
import {renderComponent, replaceComponent, RenderPosition, removeElement} from '../utils/render.js';
import {COLOR} from '../const.js';

const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

const EmptyTask = {
  description: ``,
  dueDate: null,
  repeatingDays: {
    'mo': false,
    'tu': false,
    'we': false,
    'th': false,
    'fr': false,
    'sa': false,
    'su': false,
  },
  tags: [],
  color: COLOR.BLACK,
  isFavorite: false,
  isArchive: false,
};

export default class TaskController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._taskComponent = null;
    this._taskFormComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(task, mode) {
    const oldTaskComponent = this._taskComponent;
    const oldTaskFormComponent = this._taskFormComponent;
    this._mode = mode;

    this._taskComponent = new TaskComponent(task);
    this._taskFormComponent = new TaskFormComponent(task);

    this._taskComponent.setEditButtonClickHandler(() => {
      this._replaceTaskToForm();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._taskComponent.setArchiveButtonClickHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isArchive: !task.isArchive,
      }));
    });

    this._taskComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isFavorite: !task.isFavorite,
      }));
    });

    this._taskFormComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const data = this._taskFormComponent.getData();
      this._onDataChange(this, task, data);
    });

    this._taskFormComponent.setDeleteButtonClickHandler(() => this._onDataChange(this, task, null));

    switch (mode) {
      case Mode.DEFAULT:
        if (oldTaskFormComponent && oldTaskComponent) {
          replaceComponent(this._taskComponent, oldTaskComponent);
          replaceComponent(this._taskFormComponent, oldTaskFormComponent);
          this._replaceFormToTask();
        } else {
          renderComponent(this._container, this._taskComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADDING:
        if (oldTaskFormComponent && oldTaskComponent) {
          removeElement(oldTaskComponent);
          removeElement(oldTaskFormComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        renderComponent(this._container, this._taskFormComponent, RenderPosition.AFTERBEGIN);
        break;
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToTask();
    }
  }

  destroy() {
    removeElement(this._taskFormComponent);
    removeElement(this._taskComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceFormToTask() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._taskFormComponent.reset();

    if (document.contains(this._taskFormComponent.getElement())) {
      replaceComponent(this._taskComponent, this._taskFormComponent);
    }
    this._mode = Mode.DEFAULT;
  }

  _replaceTaskToForm() {
    this._onViewChange();

    replaceComponent(this._taskFormComponent, this._taskComponent);
    this._mode = Mode.EDIT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyTask, null);
      }

      this._replaceFormToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}

export {Mode, EmptyTask};
