// @flow

import makeBoard from "../makeBoard";

describe('makeBoard', () => {

  test("1 x 1", () => {
    expect(makeBoard(1, 1)).toEqual([
      {x: 1, y: 1}
    ])
  });
  test("1 x 2", () => {
    expect(makeBoard(1, 2)).toEqual([
      {x: 1, y: 1},
      {x: 1, y: 2}
    ])
  });
  test("2 x 2", () => {
    expect(makeBoard(2, 2)).toEqual([
      {x: 1, y: 1},
      {x: 2, y: 1},
      {x: 1, y: 2},
      {x: 2, y: 2}
    ])
  });

});

