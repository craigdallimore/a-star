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
    //makePoint(7, 8, "OBSTACLE"),
    makePoint(7, 9, "OBSTACLE"),
  ].reduce(setPoint, board);
}

const transformPoint = (tile: Tile) => (p: Point): Point => ({ ...p, tile });

function advanceState(state) {
  const { board, path, index, goal } = state;
  const point = path[index];
  const reachedGoal = point.x === goal.x && point.y === goal.y;

  if (reachedGoal) {
    return state;
  }
  const cursor = transformPoint("CURSOR")(point);

  return {
    board: setPoint([...board], cursor),
    path,
    index: index + 1,
    goal,
  };
}

function loop(state) {
  const nextState = advanceState(state);
  print(nextState.board);
  setTimeout(() => {
    loop(nextState);
  }, 100);
}

function main() {
  const start = makePoint(9, 0, "START");
  const goal = makePoint(9, 9, "GOAL");
  const board = applyObstacles(
    [start, goal].reduce(setPoint, initialState.board)
  );
  const { path } = aStar(start, goal, board);
  const state = {
    goal,
    board,
    path: path.reverse(),
    index: 0,
  };
  loop(state);
}

main();

// KAIZEN ---------------------------------------------------------------------
