// @flow

import { diagonal, manhattan } from "../heuristic";
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
describe("diagonal", () => {
  // 0,0 0,1 0,2 0,3
  // 1,0 1,1 1,2 1,3
  // 2,0 2,1 2,2 2,3
  // 3,0 3,1 3,2 3,3
  test("the cost of moving only diagonally is the sum of diagonal steps", () => {
    const p1 = makePoint(0, 0, "BLANK");
    const p2 = makePoint(2, 2, "BLANK");
    const p3 = makePoint(3, 3, "BLANK");
    expect(diagonal(p1, p2, 1, 1.5)).toBe(3);
    expect(diagonal(p1, p3, 1, 1.5)).toBe(4.5);
  });
  test("the cost of moviing only in a cardinal direction is the sum of cardinal steps", () => {
    const p1 = makePoint(0, 0, "BLANK");
    const p2 = makePoint(0, 2, "BLANK");
    expect(diagonal(p1, p2, 1, 1.5)).toBe(2);
  });
  test("the mixed cost implies the minimum steps are taken", () => {
    const p1 = makePoint(0, 0, "BLANK");
    const p2 = makePoint(1, 1, "BLANK");
    const p3 = makePoint(1, 2, "BLANK");
    const p4 = makePoint(3, 2, "BLANK");
    expect(diagonal(p1, p2, 1, 1.5)).toBe(1.5);
    expect(diagonal(p1, p3, 1, 1.5)).toBe(2.5);
    expect(diagonal(p1, p3, 1, 1.5)).toBe(2.5);
    expect(diagonal(p1, p4, 1, 1.5)).toBe(4);
    expect(diagonal(p1, p4, 1, 1.75)).toBe(4.5);
  });
});
