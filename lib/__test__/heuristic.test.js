// @flow

import { manhattan } from "../heuristic";
import makePoint from "../makePoint";

describe("manhattan", () => {
  test("the distance between 0,0 and 0,0 is 0", () => {
    const p1 = makePoint(0, 0, "BLANK");
    const p2 = makePoint(0, 0, "BLANK");
    expect(manhattan(p1, p2, 1)).toBe(0);
  });
  test("the distance between 0,0 and 0,1 is 1", () => {
    const p1 = makePoint(0, 0, "BLANK");
    const p2 = makePoint(0, 1, "BLANK");
    expect(manhattan(p1, p2, 1)).toBe(1);
  });
  test("the distance between 0,0 and 1,0 is 1", () => {
    const p1 = makePoint(0, 0, "BLANK");
    const p2 = makePoint(1, 0, "BLANK");
    expect(manhattan(p1, p2, 1)).toBe(1);
  });
  test("the distance between 0,0 and 1,1 is 2", () => {
    const p1 = makePoint(0, 0, "BLANK");
    const p2 = makePoint(1, 1, "BLANK");
    expect(manhattan(p1, p2, 1)).toBe(2);
  });
  test("the distance between 0,0 and 2,2 is 4", () => {
    const p1 = makePoint(0, 0, "BLANK");
    const p2 = makePoint(2, 2, "BLANK");
    expect(manhattan(p1, p2, 1)).toBe(4);
  });
});

