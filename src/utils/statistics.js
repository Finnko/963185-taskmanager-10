import moment from "moment";
import {COLOR} from "../const";

const ColorValue = {
  [COLOR.BLACK]: `#000000`,
  [COLOR.BLUE]: `#0c5cdd`,
  [COLOR.GREEN]: `#31b55c`,
  [COLOR.PINK]: `#ff3cb9`,
  [COLOR.YELLOW]: `#ffe125`,
};

const ChartTextColor = {
  CHART_TEXT_COLOR: `#000000`,
  CHART_TEXT_COLOR_INVERSE: `#ffffff`
};

const getUniqItems = (item, index, array) => {
  return array.indexOf(item) === index;
};

const getTasksByDateRange = (tasks, dateFrom, dateTo) => {
  return tasks.filter((task) => {
    const dueDate = task.dueDate;

    return dueDate >= dateFrom && dueDate <= dateTo;
  });
};

const createRandomColor = () => {
  const value = Math.floor(Math.random() * 0xffffff);

  return `#${value.toString(16)}`;
};

const createPlaceholder = (dateFrom, dateTo) => {
  const format = (date) => {
    return moment(date).format(`DD MMM`);
  };

  return `${format(dateFrom)} - ${format(dateTo)}`;
};

const calcUniqCountColor = (tasks, color) => {
  return tasks.filter((it) => it.color === color).length;
};

const calculateBetweenDates = (from, to) => {
  const result = [];
  let date = new Date(from);

  while (date <= to) {
    result.push(date);

    date = new Date(date);
    date.setDate(date.getDate() + 1);
  }

  return result;
};

export {getTasksByDateRange, getUniqItems, calculateBetweenDates, createPlaceholder,
  createRandomColor, calcUniqCountColor, ColorValue, ChartTextColor};
