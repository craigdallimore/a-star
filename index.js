// @flow

// - [ ] find a path from top left to bottom right using a*
// - [ ] measure performance

// ----------------------------------------------------------------------------
// https://www.npmjs.com/package/sharp

import * as ansiEscapes from "ansi-escapes";
import R from "ramda";
import random from "random";
import seedrandom from "seedrandom";

random.use(seedrandom("dent"));

const GRID = 10;

type Point = { x: number, y: number };

type Points = Array<Point>;

type State = {
  points: Points,
  index: number,
};

// Data -----------------------------------------------------------------------

const nums: Array<number> = R.range(0, GRID);

const points: Points = nums
  .map((y) => nums.map((x) => ({ x: x * 2, y })))
  .flat();

const rockIndexes = new Array(points.length).fill(false);

rockIndexes[random.int(0, GRID * GRID)] = true;
rockIndexes[random.int(0, GRID * GRID)] = true;
rockIndexes[random.int(0, GRID * GRID)] = true;
rockIndexes[random.int(0, GRID * GRID)] = true;
rockIndexes[random.int(0, GRID * GRID)] = true;
rockIndexes[random.int(0, GRID * GRID)] = true;
rockIndexes[random.int(0, GRID * GRID)] = true;
rockIndexes[random.int(0, GRID * GRID)] = true;
rockIndexes[random.int(0, GRID * GRID)] = true;
rockIndexes[random.int(0, GRID * GRID)] = true;
rockIndexes[random.int(0, GRID * GRID)] = true;
rockIndexes[random.int(0, GRID * GRID)] = true;
rockIndexes[random.int(0, GRID * GRID)] = true;
rockIndexes[random.int(0, GRID * GRID)] = true;
rockIndexes[random.int(0, GRID * GRID)] = true;
rockIndexes[random.int(0, GRID * GRID)] = true;
rockIndexes[random.int(0, GRID * GRID)] = true;
rockIndexes[random.int(0, GRID * GRID)] = true;
rockIndexes[random.int(0, GRID * GRID)] = true;
rockIndexes[random.int(0, GRID * GRID)] = true;
rockIndexes[random.int(0, GRID * GRID)] = true;
rockIndexes[random.int(0, GRID * GRID)] = true;
rockIndexes[random.int(0, GRID * GRID)] = true;
rockIndexes[random.int(0, GRID * GRID)] = true;

console.log(rockIndexes);

const initialState: State = {
  points,
  rocks: rockIndexes,
  index: 0,
};

// Application ----------------------------------------------------------------

function getChar(cursor, point, pointIndex) {
  const cursorAtPoint = cursor.x === point.x && cursor.y === point.y;
  const rockAtPoint = rockIndexes[pointIndex];

  if (cursorAtPoint) {
    return "☺";
  }
  if (rockAtPoint) {
    return "*";
  }
  return ".";
}

function show(state): void {
  const c = state.points[state.index];
  process.stdout.write(ansiEscapes.eraseScreen);
  state.points.forEach((p, pointIndex) => {
    try {
      const char = getChar(c, p, pointIndex);
      process.stdout.write(ansiEscapes.cursorTo(p.x, p.y));
      process.stdout.write(char);
    } catch (e) {
      console.error(e);
      console.log(state);
      console.log(state.points.length);
      process.exit(1);
    }
  });
}

function loop(state: State): void {
  show(state);

  const nextIndex =
    R.inc(state.index) >= state.points.length ? 0 : R.inc(state.index);

  setTimeout(() => {
    loop({
      ...state,
      index: nextIndex,
    });
  }, 100);
}

loop(initialState);

// KAIZEN ---------------------------------------------------------------------
