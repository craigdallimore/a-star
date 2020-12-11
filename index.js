// @flow

// - [ ] add some random dots
// - [ ] find a path from top left to bottom right using a*
// - [ ] measure performance

// ----------------------------------------------------------------------------
// https://www.npmjs.com/package/sharp

import * as ansiEscapes from "ansi-escapes";
import R from "ramda";

type Point = { x: number, y: number };

type Points = Array<Point>;

type State = {
  points: Points,
  index: number,
};

// Data -----------------------------------------------------------------------

const nums: Array<number> = R.range(0, 5);

const points: Points = nums
  .map((y) => nums.map((x) => ({ x: x * 2, y })))
  .flat();

const initialState: State = {
  points,
  index: 0,
};

// Application ----------------------------------------------------------------

function show(state): void {
  const c = state.points[state.index];
  process.stdout.write(ansiEscapes.eraseScreen);
  state.points.forEach(({ x, y }) => {
    try {
      const char = c.x === x && c.y === y ? "*" : ".";
      process.stdout.write(ansiEscapes.cursorTo(x, y));
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
