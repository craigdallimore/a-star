// @flow

import makePoint from "../makePoint";

describe("makePoint", () => {
  it("creates an object", () => {
    expect(makePoint(1, 4)).toEqual({
      x: 1,
      y: 4,
      tile: "BLANK"
    });
  });
  test("the coordinates cannot be changed", () => {
    const point = makePoint(1, 4);
    expect(() => (point.x = 5)).toThrow();
  });
});
