import {filtersData} from "./task";

const generateFilters = () => {
  return Object.keys(filtersData).map((key) => {
    return {
      title: key,
      count: filtersData[key],
    };
  });
};

export {generateFilters};
