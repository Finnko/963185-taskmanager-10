const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const renderComponent = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const removeElement = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const replaceComponent = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isElementExists = !!(parentElement && newElement && oldElement);

  if (isElementExists && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }

};

export {renderComponent, replaceComponent, createElement, removeElement, RenderPosition};
