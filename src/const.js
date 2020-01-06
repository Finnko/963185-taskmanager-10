const COLOR = {
  BLACK: `black`,
  YELLOW: `yellow`,
  BLUE: `blue`,
  GREEN: `green`,
  PINK: `pink`,
};

const COLORS = [
  COLOR.BLACK,
  COLOR.YELLOW,
  COLOR.BLUE,
  COLOR.GREEN,
  COLOR.PINK
];

const daysMockData = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];

const FilterType = {
  ALL: `all`,
  ARCHIVE: `archive`,
  FAVORITES: `favorites`,
  OVERDUE: `overdue`,
  REPEATING: `repeating`,
  TAGS: `tags`,
  TODAY: `today`,
};

export {COLORS, COLOR, daysMockData, FilterType};
