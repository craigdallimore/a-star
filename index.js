// @flow
import type { Point, Board } from "./types";
import R from "ramda";
import { initialState } from "./lib/state";
import { print } from "./lib/print";
import makePoint from "./lib/makePoint";

// Application ----------------------------------------------------------------

function getPoint(x: number, y: number, board: Board): Point {
  return board[y][x];
}

function updatePoint(board: Board, point: Point): Board {
  const { x, y } = point;
  board[y][x] = point;
  return board;
}

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
  ].reduce(updatePoint, board);
}

function getNeighbours(point: Point, board: Board): Array<Point> {
  const width = board[0].length;
  const height = board.length;

  const left = Math.max(0, point.x - 1);
  const right = Math.min(point.x + 1, width);
  const top = Math.max(0, point.y - 1);
  const bottom = Math.min(point.y + 1, height);

  return R.range(left, right + 1)
    .map(x => R.range(top, bottom + 1).map(y => ({ x, y })))
    .flat()
    .filter(({ x, y }) => {
      const isCurrentPoint = x === point.x && y === point.y;
      const isObstacle = getPoint(x, y, board).tile === "OBSTACLE";
      return !isCurrentPoint && !isObstacle;
    })
    .map(({ x, y }) => getPoint(x, y, board));
}

function getPath(s: Point, g: Point, board: Board): Array<Point> {
  return getNeighbours(s, board).map(p => ({ ...p, tile: "CURSOR" }));
}

function applyPath(board: Board): Board {
  const start = makePoint(0, 0, "START");
  const goal = makePoint(9, 9, "GOAL");
  const path = getPath(start, goal, board);
  setTimeout(() => {
    console.log(path);
  }, 200);
  return [...path, start, goal].reduce(updatePoint, board);
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
//applyPath(applyObstacles(initialState.board));

// KAIZEN ---------------------------------------------------------------------
