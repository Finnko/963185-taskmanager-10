

const createTasksTemplate = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};


export default class NoTasks {
  getTemplate() {
    return createTasksTemplate();
  }
}

