// @flow

export type Tile = "BLANK" | "START" | "GOAL" | "CURSOR" | "OBSTACLE";

export type Point = {
  x: number,
  y: number,
  tile: Tile
};

export type Board = Array<Array<Point>>;

export type State = {|
  board: Board
|};
