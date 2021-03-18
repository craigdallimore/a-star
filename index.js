// @flow
import type { Point, Board, Tile } from "./types";
import { initialState } from "./lib/state";
import { print } from "./lib/print";
import makePoint from "./lib/makePoint";
import aStar from "./lib/aStar";
import { setPoint } from "./lib/board";

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
    makePoint(6, 5, "OBSTACLE"),

    makePoint(3, 7, "OBSTACLE"),
    makePoint(4, 7, "OBSTACLE"),
    makePoint(5, 7, "OBSTACLE"),
    makePoint(6, 7, "OBSTACLE"),
    makePoint(7, 7, "OBSTACLE"),
    makePoint(8, 7, "OBSTACLE"),
    makePoint(9, 7, "OBSTACLE"),

    makePoint(7, 7, "OBSTACLE"),
    makePoint(7, 8, "OBSTACLE"),
    makePoint(7, 9, "OBSTACLE"),
  ].reduce(setPoint, board);
}

const transformPoint = (tile: Tile) => (p: Point): Point => ({ ...p, tile });

function applyPath(board: Board): Board {
  const start = makePoint(9, 0, "START");
  const goal = makePoint(9, 9, "GOAL");
  const { path, reachedGoal } = aStar(start, goal, board);

  setTimeout(() => {
    console.log({ reachedGoal, path });
  }, 1000);

  return [...path.map(transformPoint("PATH")), start, goal].reduce(
    setPoint,
    board
  );
}

print(applyPath(applyObstacles(initialState.board)));

// KAIZEN ---------------------------------------------------------------------
