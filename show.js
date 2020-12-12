// @flow
import * as ansiEscapes from "ansi-escapes";
import chalk from "chalk";
import { rockIndexes, type State } from "./state";

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
    return "*";
  }
  return ".";
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
