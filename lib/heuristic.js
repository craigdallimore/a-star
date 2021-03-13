// @flow

import type { Point } from "../types";

export function manhattan(p1: Point, p2: Point, cardinalCost: number): number {
  return cardinalCost * Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

export function diagonal(
  p1: Point,
  p2: Point,
  cardinalCost: number, // cost for moving in one of the 4 cardinal directions
  diagonalCost: number // cost for moving in one of the 4 diagonal directions
): number {
  // Horizontal distance
  const dx = Math.abs(p1.x - p2.x);
  // Vertical distance
  const dy = Math.abs(p1.y - p2.y);

  return (
    // the manhattan distance, plus
    cardinalCost * (dx + dy) +
    // the difference between using manhattan to get to a diagonal, or just
    // moving diagonally, multiplied by the smaller of the manhattan dimensions.
    (diagonalCost - 2 * cardinalCost) * Math.min(dx, dy)
  );
}
