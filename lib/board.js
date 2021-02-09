// @flow

import R from "ramda";

import type { Point, Board } from "../types";

export function getPoint(x: number, y: number, board: Board): Point {
  return board[y][x];
}

export function setPoint(board: Board, point: Point): Board {
  const { x, y } = point;
  board[y][x] = point;
  return board;
}

export function getNeighbours(point: Point, board: Board): Array<Point> {
  const width = board[0].length - 1;
  const height = board.length - 1;

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

