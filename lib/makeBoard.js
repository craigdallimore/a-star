// @flow
import R from "ramda";
import makePoint from "./makePoint";
import type { Point } from "../types";

export default (width: number, height: number): Array<Point> => {
  const cols = R.range(1, width + 1);
  const rows = R.range(1, height + 1);
  return rows.map(y => cols.map(x => makePoint(x, y))).flat();
};
