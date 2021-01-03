import * as show from "../show";
import makeBoard from "../lib/makeBoard";

test("showing a blank board", () => {
  const board = makeBoard(3, 3);
  expect(show(board)).toMatchInlineSnapshot("");
});

// test("showing a board with obstacles", () => {});
// test("showing a board with a start and a goal", () => {});
// test("showing a board with a path", () => {});
