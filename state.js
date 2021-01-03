// @flow
import R from "ramda";
import random from "random";
import seedrandom from "seedrandom";
import type { State, Board } from "./types";

random.use(seedrandom("dent"));

export const GRID = 10;

// Data -----------------------------------------------------------------------

const nums: Array<number> = R.range(0, GRID);

const pathIndexes: Array<number> = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

const board: Board = nums.map((y) => nums.map((x) => ({ x, y }))).flat();

// A set of ~24 integers between 0 and 100
const randomIndexes = new Set(R.times(() => random.int(0, GRID * GRID), 24));

// An array of 100 booleans, true if in the randomIndexes set
export const rockIndexes: Array<boolean> = new Array(board.length)
  .fill(false)
  .map((b, index) => (randomIndexes.has(index) ? true : false));

export const initialState: State = {
  board,
  path: pathIndexes,
  rocks: rockIndexes,
  index: 0,
};
