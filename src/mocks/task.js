import {colorsMockData} from "../const";
import {getRandomArrayItem, getRandomDate} from "../utils";

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

const defaultFiltersData = {
  'all': 0,
  'overdue': 0,
  'today': 0,
  'favorites': 0,
  'repeating': 0,
  'tags': 0,
  'archive': 0,
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

const generateRepeatingDays = () => {
  return Object.assign({}, defaultRepeatingDays, {
    'mo': Math.random() > 0.5,
    'tu': Math.random() > 0.5,
    'we': Math.random() > 0.5,
    'th': Math.random() > 0.5,
    'fr': Math.random() > 0.5,
    'sa': Math.random() > 0.5,
    'su': Math.random() > 0.5,
  });
};

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

const filtersData = tasksData.reduce(function (prevData, item) {
  prevData.all = tasksData.length;
  prevData.overdue += item.dueDate < Date.now() ? 1 : 0;
  prevData.today += new Date(item.dueDate).getTime() === new Date(Date.now()).getTime() ? 1 : 0;
  prevData.repeating += Object.values(item.repeatingDays).some(Boolean);
  prevData.tags += item.tags.size ? 1 : 0;
  prevData.favorites += item.isFavorite ? 1 : 0;
  prevData.archive += item.isArchive ? 1 : 0;

  return prevData;
}, defaultFiltersData);

export {generateTask, tasksData, filtersData};
