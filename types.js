// @flow

export type Point = { x: number, y: number };

export type Board = Array<Point>;

export type State = {|
  board: Board,
  path: Array<number>,
  rocks: Array<boolean>,
  index: number,
|};
