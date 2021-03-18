// @flow
import PQ, { LOW_FIRST } from "@decoy9697/priority-queue";
import type { Point, Board } from "../types";
import { diagonal } from "./heuristic";
import { getNeighbours } from "./board";

function matchLocation(p1: Point, p2: Point): boolean {
  return p1.x === p2.x && p1.y === p2.y;
}

const cardinalCost = 1;
const diagonalCost = 1.5;

function reconstructPath(
  cameFrom: Map<Point, ?Point>,
  start: Point,
  goal: Point
): { path: Array<Point>, reachedGoal: boolean } {
  const path = [];
  let current = goal;
  let reachedStart = matchLocation(current, start);
  while (!reachedStart) {
    path.push(current);
    const next = cameFrom.get(current);
    if (next) {
      current = next;
    } else {
      reachedStart = matchLocation(current, start);
      break;
    }
  }
  return { path, reachedGoal: reachedStart };
}

export default function aStar(
  start: Point,
  goal: Point,
  board: Board
): { path: Array<Point>, reachedGoal: boolean } {
  const cameFrom = new Map<Point, ?Point>();
  const costSoFar = new Map<Point, number>();

  cameFrom.set(start, null);
  costSoFar.set(start, 0);

  const frontier = new PQ<Point>({ sort: LOW_FIRST });

  frontier.insert(start, 0);

  while (!frontier.isEmpty()) {
    const current: ?Point = frontier.pop();
    if (!current) {
      break;
    }

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

  return reconstructPath(cameFrom, start, board[goal.y][goal.x]);
}
