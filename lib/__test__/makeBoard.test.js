// @flow

import makeBoard from "../makeBoard";

describe("makeBoard", () => {
  test("1 x 1", () => {
    expect(makeBoard(1, 1)).toEqual([[{ x: 0, y: 0 }]]);
  });
  test("1 x 2", () => {
    expect(makeBoard(1, 2)).toEqual([[{ x: 0, y: 0 }], [{ x: 0, y: 1 }]]);
  });
  test("2 x 2", () => {
    expect(makeBoard(2, 2)).toEqual([
      [{ x: 0, y: 0 }, { x: 1, y: 0 }],
      [{ x: 0, y: 1 }, { x: 1, y: 1 }]
    ]);
  });
});
