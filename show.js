// @flow

import * as ansiEscapes from "ansi-escapes";
import chalk from "chalk";
import { GRID, rockIndexes } from "./state";
import type { State, Point, Board } from "./types";

// https://beautifulwebtype.com/fira-code/glyphs/?i=1383
function getGridChar({ x, y }: Point, board: Board) {
  const isLeft = x === 0;
  const isRight = x === board[0].length - 1;
  const isTop = y === 0;
  const isBottom = y === board.length - 1;

  if (isLeft) {
    if (isTop) {
      return "┌";
    }
    if (isBottom) {
      return "└";
    }
    return "├";
  }

  if (isRight) {
    if (isTop) {
      return "┐";
    }
    if (isBottom) {
      return "┘";
    }
    return "┤";
  }
  if (isTop) {
    return "┬";
  }
  if (isBottom) {
    return "┴";
  }
  return "┼";
}

/*
function getChar(
  cursor: Point,
  point: Point,
  pointIndex: number,
  pathIndexes: Array<number>
) {
  const cursorAtPoint = cursor.x === point.x && cursor.y === point.y;
  const rockAtPoint = rockIndexes[pointIndex];
  const pathAtPoint = pathIndexes.includes(pointIndex);

  if (cursorAtPoint && rockAtPoint) {
    return chalk.red("☺");
  }
  if (cursorAtPoint) {
    return chalk.green("☺");
  }
  if (rockAtPoint) {
    return "●";
  }
  const gridChar = getGridChar(point);
  return pathAtPoint ? chalk.blueBright(gridChar) : gridChar;
}

export function oldshow(state: State): void {
  const c = state.board[state.index];
  process.stdout.write(ansiEscapes.eraseScreen);
  state.board.forEach((p, pointIndex) => {
    try {
      const char = getChar(c, p, pointIndex, state.path);
      process.stdout.write(ansiEscapes.cursorTo(p.x, p.y));
      process.stdout.write(char);
    } catch (e) {
      console.error(e);
      console.log(state);
      console.log(state.board.length);
      process.exit(1);
    }
  });
}
*/

export function show(board: Board): string {
  return board
    .map(cols => cols.map(point => getGridChar(point, board)).join(""))
    .join("\n");
}
