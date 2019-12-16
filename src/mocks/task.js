import {colorsMockData} from "../const";
import {getRandomArrayItem, getRandomDate} from "../utils/common";

const TASKS_COUNT = 25;

const descriptionItems = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

const defaultRepeatingDays = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false,
};

const tagsTemplates = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`,
];

const generateTags = (tags) => {
  return tags
    .filter(() => Math.random() > 0.5)
    .slice(0, 3);
};

const generateRepeatingDays = () =>
  Object.keys(defaultRepeatingDays).reduce((accum, currentValue) =>
    Object.assign(accum, {[currentValue]: Math.random() > 0.5}), {});

const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? null : getRandomDate();

  return {
    description: getRandomArrayItem(descriptionItems),
    dueDate,
    repeatingDays: dueDate ? defaultRepeatingDays : generateRepeatingDays(),
    tags: new Set(generateTags(tagsTemplates)),
    color: getRandomArrayItem(colorsMockData),
    isFavorite: Math.random() > 0.5,
    isArchive: Math.random() > 0.5,
  };
};

const generateTasks = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTask);
};

const tasksData = generateTasks(TASKS_COUNT);

export {generateTask, tasksData};
