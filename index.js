// @flow

// - show an SVG in the terminal
// - draw the SVG from a datastructure produced by node
// - update the view over time
// - allow for hotreloading of the node app
// - show a nice grid
// - add some random dots
// - find a path from top left to bottom right using a*
// - measure performance

type Xyz = {
  a: string,
  b: boolean,
};

function test(xyz: Xyz): boolean {
  return xyz.b;
}
