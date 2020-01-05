import moment from "moment";

const getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomInRange(0, array.length - 1);

  return array[randomIndex];
};

const getRandomDate = () => {
  const targetDate = new Date();

  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomInRange(0, 7);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const formatTime = (value) => {
  return moment(value).format(`hh:mm A`);
};

const formatDate = (value) => {
  return moment(value).format(`DD MMMM`);
};

const isRepeating = (repeatingDays) => {
  return Object.values(repeatingDays).some(Boolean);
};

const isOverdueDate = (dueDate, date) => {
  return dueDate < date && !isOneDay(date, dueDate);
};

const isOneDay = (dateA, dateB) => {
  const a = moment(dateA);
  const b = moment(dateB);
  return a.diff(b, `days`) === 0 && dateA.getDate() === dateB.getDate();
};

export {getRandomInRange, getRandomArrayItem, getRandomDate, formatTime, formatDate, isOneDay, isOverdueDate, isRepeating};
