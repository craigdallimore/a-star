// @flow
import R from "ramda";
import random from "random";
import seedrandom from "seedrandom";

random.use(seedrandom("dent"));

export const GRID = 10;

export type Point = { x: number, y: number };

type Points = Array<Point>;

export type State = {
  points: Points,
  index: number,
};

// Data -----------------------------------------------------------------------

const nums: Array<number> = R.range(0, GRID);

const points: Points = nums.map((y) => nums.map((x) => ({ x, y }))).flat();

// A set of ~24 integers between 0 and 100
const randomIndexes = new Set(R.times(() => random.int(0, GRID * GRID), 24));

// An array of 100 booleans, true if in the randomIndexes set
export const rockIndexes: Array<boolean> = new Array(points.length)
  .fill(false)
  .map((b, index) => (randomIndexes.has(index) ? true : false));

export const initialState: State = {
  points,
  rocks: rockIndexes,
  index: 0,
};
