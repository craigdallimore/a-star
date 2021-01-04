// @flow
import { show } from "../show";
import makeBoard from "../makeBoard";

test("showing a blank board", () => {
  expect(`
${show(makeBoard(3, 3))}
`).toMatchInlineSnapshot(`
    "
    ┌┬┐
    ├┼┤
    └┴┘
    "
  `);
  expect(`
${show(makeBoard(5, 8))}
`).toMatchInlineSnapshot(`
    "
    ┌┬┬┬┐
    ├┼┼┼┤
    ├┼┼┼┤
    ├┼┼┼┤
    ├┼┼┼┤
    ├┼┼┼┤
    ├┼┼┼┤
    └┴┴┴┘
    "
  `);
});

// test("showing a board with obstacles", () => {});
// test("showing a board with a start and a goal", () => {});
// test("showing a board with a path", () => {});
