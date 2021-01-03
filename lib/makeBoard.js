// @flow
import R from "ramda";
import makePoint from "./makePoint";
import type { Board } from "../types";

export default (width: number, height: number): Board => {
  const cols = R.range(0, width);
  const rows = R.range(0, height);
  return rows.map(y => cols.map(x => makePoint(x, y)));
};
