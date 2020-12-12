// @flow

import * as ansiEscapes from "ansi-escapes";
import chalk from "chalk";
import { GRID, rockIndexes } from "./state";
import type { State, Point } from "./state";

function getGridChar({ x, y }: Point) {
  if (x === 0 && y === 0) {
    return "┌";
  }
  if (x === 0 && y === GRID - 1) {
    return "└";
  }
  if (x === 0) {
    return "├";
  }
  if (x === GRID - 1 && y === 0) {
    return "┐";
  }
  if (x === GRID - 1 && y === GRID - 1) {
    return "┘";
  }
  if (x === GRID - 1) {
    return "┤";
  }
  if (y === 0) {
    return "┬";
  }
  if (y === GRID - 1) {
    return "┴";
  }
  return "┼";
}

function getChar(cursor, point, pointIndex) {
  const cursorAtPoint = cursor.x === point.x && cursor.y === point.y;
  const rockAtPoint = rockIndexes[pointIndex];

  if (cursorAtPoint && rockAtPoint) {
    return chalk.red("☺");
  }
  if (cursorAtPoint) {
    return chalk.green("☺");
  }
  if (rockAtPoint) {
    return "●";
  }
  return getGridChar(point);
}

export function show(state: State): void {
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
