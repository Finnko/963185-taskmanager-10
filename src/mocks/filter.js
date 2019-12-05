import {tasksData} from "./task";

const filtersData = {
  'all': tasksData.length,
  'overdue': tasksData.filter((task) => task.dueDate instanceof Date && task.dueDate < Date.now()).length,
  'today': tasksData.filter((task) => task.dueDate && task.dueDate.getDate() === new Date().getDate()).length,
  'favorites': tasksData.filter((task) => task.isFavorite).length,
  'repeating': tasksData.filter((task) => Object.values(task.repeatingDays).some(Boolean)).length,
  'tags': tasksData.filter((task) => task.tags.size).length,
  'archive': tasksData.filter((task) => task.isArchive).length,
};

const generateFilters = () => {
  return Object.keys(filtersData).map((key) => {
    return {
      title: key,
      count: filtersData[key],
    };
  });
};

export {generateFilters};
