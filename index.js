// @flow
import type { Point, State, Board } from "./types";
import { initialState } from "./lib/state";
import { print } from "./lib/print";
import makePoint from "./lib/makePoint";

// Application ----------------------------------------------------------------

function updatePoint(board: Board, point: Point): Board {
  const { x, y } = point;
  board[x][y] = point;
  return board;
}

function applyTiles(board: Board): Board {
  return [
    makePoint(0, 0, "START"),
    makePoint(9, 9, "GOAL"),

    makePoint(2, 3, "OBSTACLE"),
    makePoint(2, 4, "OBSTACLE"),
    makePoint(2, 5, "OBSTACLE"),
    makePoint(2, 6, "OBSTACLE"),
    makePoint(2, 7, "OBSTACLE"),
    makePoint(2, 8, "OBSTACLE"),
    makePoint(2, 9, "OBSTACLE"),

    makePoint(5, 0, "OBSTACLE"),
    makePoint(5, 1, "OBSTACLE"),
    makePoint(5, 2, "OBSTACLE"),
    makePoint(5, 3, "OBSTACLE"),
    makePoint(5, 4, "OBSTACLE"),
    makePoint(5, 5, "OBSTACLE"),
    makePoint(5, 6, "OBSTACLE")
  ].reduce(updatePoint, board);
}

function loop(state: State): void {
  print(applyTiles(state.board));
  setTimeout(() => {
    const nextState = { ...state };
    //loop(nextState);
  }, 100);
}

loop(initialState);

// KAIZEN ---------------------------------------------------------------------
