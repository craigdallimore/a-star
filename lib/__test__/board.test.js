// @flow

import { getPoint, setPoint, getNeighbours } from "../board";
import makeBoard from "../makeBoard";
import makePoint from "../makePoint";

// A 5x5 board for reference

// 0,0  0,1  0,2  0,3  0,4
// 1,0  1,1  1,2  1,3  1,4
// 2,0  2,1  2,2  2,3  2,4
// 3,0  3,1  3,2  3,3  3,4
// 4,0  4,1  4,2  4,3  4,4

describe("getPoint", () => {
  it("returns the point at the given location on the board", () => {
    const board = makeBoard(14, 14);
    const point = getPoint(3, 5, board);
    expect(point.x).toBe(3);
    expect(point.y).toBe(5);
    expect(point).toBe(board[5][3]);
  });
});

describe("setPoint", () => {
  it("replaces the point on the board at the given co-ordinates", () => {
    const board = makeBoard(14, 14);
    const point = makePoint(3, 5, "OBSTACLE");
    const nextBoard = setPoint(board, point);
    expect(getPoint(3, 5, nextBoard)).toBe(point);
  });
});

describe("getNeighbours", () => {
  it("returns the 8 surrounding neighbours of an unobstructed point", () => {
    const board = makeBoard(5, 5);
    const point = getPoint(3, 3, board);
    const neighbours = getNeighbours(point, board);
    expect(neighbours.length).toBe(8);
    expect(neighbours).toEqual([
      { x: 2, y: 2, tile: "BLANK" },
      { x: 2, y: 3, tile: "BLANK" },
      { x: 2, y: 4, tile: "BLANK" },
      { x: 3, y: 2, tile: "BLANK" },
      { x: 3, y: 4, tile: "BLANK" },
      { x: 4, y: 2, tile: "BLANK" },
      { x: 4, y: 3, tile: "BLANK" },
      { x: 4, y: 4, tile: "BLANK" },
    ]);
  });

  test("neighbours of a point at the top left", () => {
    const board = makeBoard(5, 5);
    const point = getPoint(0, 0, board);
    const neighbours = getNeighbours(point, board);
    expect(neighbours.length).toBe(3);
    expect(neighbours).toEqual([
      { x: 0, y: 1, tile: "BLANK" },
      { x: 1, y: 0, tile: "BLANK" },
      { x: 1, y: 1, tile: "BLANK" },
    ]);
  });
  test("neighbours of a point at the bottom right", () => {
    const board = makeBoard(5, 5);

    const point = getPoint(4, 4, board);
    const neighbours = getNeighbours(point, board);
    expect(neighbours.length).toBe(3);
    expect(neighbours).toEqual([
      { x: 3, y: 3, tile: "BLANK" },
      { x: 3, y: 4, tile: "BLANK" },
      { x: 4, y: 3, tile: "BLANK" },
    ]);
  });
  test("neighbours of a point near obstructions", () => {
    const board = makeBoard(5, 5);
    const point = getPoint(2, 2, board);
    const obstacle1 = makePoint(1, 2, "OBSTACLE");
    const obstacle2 = makePoint(3, 2, "OBSTACLE");
    const obstacle3 = makePoint(2, 1, "OBSTACLE");
    const obstacle4 = makePoint(2, 3, "OBSTACLE");
    const nextBoard = [obstacle1, obstacle2, obstacle3, obstacle4].reduce(
      (acc, o) => setPoint(acc, o),
      board
    );
    const neighbours = getNeighbours(point, nextBoard);
    expect(neighbours.length).toBe(4);
    expect(neighbours).toEqual([
      { x: 1, y: 1, tile: "BLANK" },
      { x: 1, y: 3, tile: "BLANK" },
      { x: 3, y: 1, tile: "BLANK" },
      { x: 3, y: 3, tile: "BLANK" },
    ]);
  });
});
