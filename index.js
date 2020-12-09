// @flow

// - [ ] show an SVG in the terminal
// - [ ] draw the SVG from a datastructure produced by node
// - [ ] update the view over time
// - [ ] allow for hotreloading of the node app
// - [ ] show a nice grid
// - [ ] add some random dots
// - [ ] find a path from top left to bottom right using a*
// - [ ] measure performance

// ----------------------------------------------------------------------------
// https://www.npmjs.com/package/sharp

import * as ansiEscapes from "ansi-escapes";

type Point = { x: number, y: number };

type Points = Array<Point>;

function show(points): void {
  process.stdout.write(ansiEscapes.eraseScreen);
  points.forEach(({ x, y }) => {
    process.stdout.write(ansiEscapes.cursorTo(x, y));
    process.stdout.write(".");
  });
}

const points: Points = [
  { x: 0, y: 0 },
  { x: 10, y: 0 },
  { x: 10, y: 10 },
  { x: 0, y: 10 },
];

show(points);
