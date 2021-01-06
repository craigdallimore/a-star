// @flow
import type { Point, Board } from "./types";
import { initialState } from "./lib/state";
import { print } from "./lib/print";
import makePoint from "./lib/makePoint";
import { getNeighbours, setPoint } from "./lib/board";

// Application ----------------------------------------------------------------

function applyObstacles(board: Board): Board {
  return [
    makePoint(3, 2, "OBSTACLE"),
    makePoint(4, 2, "OBSTACLE"),
    makePoint(5, 2, "OBSTACLE"),
    makePoint(6, 2, "OBSTACLE"),
    makePoint(7, 2, "OBSTACLE"),
    makePoint(8, 2, "OBSTACLE"),
    makePoint(9, 2, "OBSTACLE"),

    makePoint(0, 5, "OBSTACLE"),
    makePoint(1, 5, "OBSTACLE"),
    makePoint(2, 5, "OBSTACLE"),
    makePoint(3, 5, "OBSTACLE"),
    makePoint(4, 5, "OBSTACLE"),
    makePoint(5, 5, "OBSTACLE"),
    makePoint(6, 5, "OBSTACLE")
  ].reduce(setPoint, board);
}

function getPath(s: Point, g: Point, board: Board): Array<Point> {
  return getNeighbours(s, board).map(p => ({ ...p, tile: "CURSOR" }));
}

function applyPath(board: Board): Board {
  const start = makePoint(9, 9, "START");
  const goal = makePoint(9, 9, "GOAL");
  const path = getPath(start, goal, board);
  setTimeout(() => {
    console.log(path);
  }, 200);
  return [...path, start, goal].reduce(setPoint, board);
}

/*
function loop(state: State): void {
  setTimeout(() => {
    const nextState = { ...state };
    //loop(nextState);
  }, 100);
}
loop(initialState);
*/

print(applyPath(applyObstacles(initialState.board)));

// KAIZEN ---------------------------------------------------------------------
