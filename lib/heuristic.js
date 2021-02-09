// @flow

import type { Point } from "../types";

export function manhattan(p1: Point, p2: Point, cardinalCost: number): number {
  return cardinalCost * Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

export function diagonal(
  p1: Point,
  p2: Point,
  cardinalCost: number,
  ordinalCost: number
): number {
  const dx = Math.abs(p1.x - p2.x);
  const dy = Math.abs(p1.y - p2.y);
  return (
    cardinalCost * (dx + dy) +
    (ordinalCost - 2 * cardinalCost) * Math.min(dx, dy)
  );
}

