// @flow

import type { Point, Tile } from "../types";

export default (x: number, y: number, tile: Tile): Point =>
  Object.freeze({
    x,
    y,
    tile
  });
