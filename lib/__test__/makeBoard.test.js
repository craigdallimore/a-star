// @flow

import makeBoard from "../makeBoard";

describe("makeBoard", () => {
  test("1 x 1", () => {
    expect(makeBoard(1, 1)).toEqual([[{ x: 0, y: 0, tile: "BLANK" }]]);
  });
  test("1 x 2", () => {
    expect(makeBoard(1, 2)).toEqual([
      [{ x: 0, y: 0, tile: "BLANK" }],
      [{ x: 0, y: 1, tile: "BLANK" }]
    ]);
  });
  test("2 x 2", () => {
    expect(makeBoard(2, 2)).toEqual([
      [{ x: 0, y: 0, tile: "BLANK" }, { x: 1, y: 0, tile: "BLANK" }],
      [{ x: 0, y: 1, tile: "BLANK" }, { x: 1, y: 1, tile: "BLANK" }]
    ]);
  });
});
