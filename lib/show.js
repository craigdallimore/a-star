// @flow

import type { Point, Board } from "../types";

// https://beautifulwebtype.com/fira-code/glyphs/?i=1383
export function getGridChar({ x, y }: Point, board: Board) {
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

export function show(board: Board): string {
  return board
    .map((cols) => cols.map((point) => getGridChar(point, board)).join(""))
    .join("\n");
}
