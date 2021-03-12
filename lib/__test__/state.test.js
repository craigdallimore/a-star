// @flow

import { initialState } from "../state";
import { getPoint } from "../board";

describe("the board", () => {
  test("it is 10 x 10", () => {
    expect(initialState.board[0].length).toBe(10);
    expect(initialState.board.length).toBe(10);
  });
  test("it is 0 indexed", () => {
    expect(getPoint(0, 0, initialState.board)).toBeDefined();
    expect(getPoint(9, 9, initialState.board)).toBeDefined();
    expect(() => getPoint(10, 10, initialState.board)).toThrow(
      "Cannot read property '10' of undefined"
    );
  });
});
