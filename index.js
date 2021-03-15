// @flow
import PQ, { LOW_FIRST } from "@decoy9697/priority-queue";
import type { Point, Board } from "./types";
import { initialState } from "./lib/state";
import { print } from "./lib/print";
import makePoint from "./lib/makePoint";
import { diagonal } from "./lib/heuristic";
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
    makePoint(6, 5, "OBSTACLE"),

    makePoint(3, 7, "OBSTACLE"),
    makePoint(4, 7, "OBSTACLE"),
    makePoint(5, 7, "OBSTACLE"),
    makePoint(6, 7, "OBSTACLE"),
    makePoint(7, 7, "OBSTACLE"),
    makePoint(8, 7, "OBSTACLE"),
    makePoint(9, 7, "OBSTACLE"),
  ].reduce(setPoint, board);
}

const cardinalCost = 1;
const diagonalCost = 1.5;

function reconstructPath(
  cameFrom: Map<Point, ?Point>,
  start: Point,
  goal: Point
): Array<Point> {
  const path = [];
  let current = goal;
  let condition = current.x === start.x && current.y === start.y;
  while (!condition) {
    path.push(current);
    const next = cameFrom.get(current);
    if (next) {
      current = next;
    } else {
      break;
    }
  }
  return path;
}

function getPath(start: Point, goal: Point, board: Board): Array<Point> {
  const cameFrom = new Map<Point, ?Point>();
  const costSoFar = new Map<Point, number>();

  cameFrom.set(start, null);
  costSoFar.set(start, 0);

  const frontier = new PQ<Point>({ sort: LOW_FIRST });

  frontier.insert(start, 0);

  while (!frontier.isEmpty()) {
    // $FlowFixMe
    const current: Point = frontier.pop();

    if (current.x === goal.x && current.y === goal.y) {
      break;
    }

    const neighbours = getNeighbours(current, board);
    for (let neighbour of neighbours) {
      const currentCost = costSoFar.get(current) || 0;
      const neighbourCost = costSoFar.get(neighbour) || 0;
      const newcost =
        currentCost + diagonal(current, neighbour, cardinalCost, diagonalCost);
      const hasVisitedNeighbour = costSoFar.has(neighbour);
      const hasLowerCost = newcost < neighbourCost;
      if (!hasVisitedNeighbour || hasLowerCost) {
        costSoFar.set(neighbour, newcost);
        const priority =
          newcost + diagonal(neighbour, goal, cardinalCost, diagonalCost);
        frontier.insert(neighbour, priority);
        cameFrom.set(neighbour, current);
      }
    }
  }

  return reconstructPath(cameFrom, start, board[goal.y][goal.x]).map((p) => ({
    ...p,
    tile: "PATH",
  }));
}

function applyPath(board: Board): Board {
  const start = makePoint(9, 0, "START");
  const goal = makePoint(9, 9, "GOAL");
  const path = getPath(start, goal, board);
  return [...path, start, goal].reduce(setPoint, board);
}

print(applyPath(applyObstacles(initialState.board)));

// KAIZEN ---------------------------------------------------------------------
