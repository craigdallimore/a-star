import {describe, test, expect, it} from 'vitest';
import * as fc from 'fast-check';
import aStar from '../index.js';

// This a-star implementation does not have baked-in assumptions about the
// structure of the data, so a `getNeighbours` function needs to be supplied
// that will work with the data structure.
// For the tests, we will use a grid made from an array of columns, each
// containing an array of items (one per row);

type Grid = Array<Array<[number, number]>>;

function makeGrid(cols: number, rows: number): Grid {
  return Array.from({length: cols}).map((_, colIndex) =>
    Array.from({length: rows}).map((_, rowIndex) => [colIndex, rowIndex]),
  );
}

function getId(node: [number, number]): string {
  return `[${node[0]},${node[1]}]`;
}

function makeGetNeighbours(cols: Grid) {
  return function getNeighbours(p: [number, number]): Array<[number, number]> {
    const [col, row] = p;

    const firstCol = cols[0] as Array<[number, number]>;
    const currentCol = cols[col] as Array<[number, number]>;
    const previousCol = cols[col - 1] as Array<[number, number]>;
    const nextCol = cols[col + 1] as Array<[number, number]>;

    const lastColIndex = cols.length - 1;
    const lastRowIndex = firstCol.length - 1;
    const hasColToLeft = col > 0;
    const hasColToRight = col < lastColIndex;
    const hasRowAbove = row > 0;
    const hasRowBelow = row < lastRowIndex;

    const neighbours: Array<[number, number]> = [];

    if (hasRowAbove && hasColToLeft) {
      neighbours.push(previousCol[row - 1] as [number, number]);
    }

    if (hasRowAbove) {
      neighbours.push(currentCol[row - 1] as [number, number]);
    }

    if (hasRowAbove && hasColToRight) {
      neighbours.push(nextCol[row - 1] as [number, number]);
    }

    if (hasColToLeft) {
      neighbours.push(previousCol[row] as [number, number]);
    }

    if (hasColToRight) {
      neighbours.push(nextCol[row] as [number, number]);
    }

    if (hasRowBelow && hasColToLeft) {
      neighbours.push(previousCol[row + 1] as [number, number]);
    }

    if (hasRowBelow) {
      neighbours.push(currentCol[row + 1] as [number, number]);
    }

    if (hasRowBelow && hasColToRight) {
      neighbours.push(nextCol[row + 1] as [number, number]);
    }

    return neighbours;
  };
}

// Check that the getNeighbours test function works as expected

describe('getNeighbours', () => {
  const grid = makeGrid(5, 5);
  const getNeighbours = makeGetNeighbours(grid);

  // ┏━━━┳━━━┳━━━┳━━━┳━━━┓
  // ┃0,0┃1,0┃2,0┃3,0┃4,0┃
  // ┣━━━╋━━━╋━━━╋━━━╋━━━┫
  // ┃0,1┃1,1┃2,1┃3,1┃4,1┃
  // ┣━━━╋━━━╋━━━╋━━━╋━━━┫
  // ┃0,2┃1,2┃2,2┃3,2┃4,2┃
  // ┣━━━╋━━━╋━━━╋━━━╋━━━┫
  // ┃0,3┃1,3┃2,3┃3,3┃4,3┃
  // ┣━━━╋━━━╋━━━╋━━━╋━━━┫
  // ┃0,4┃1,4┃2,4┃3,4┃4,4┃
  // ┗━━━┻━━━┻━━━┻━━━┻━━━┛

  const arbitraryPoint = fc.tuple(
    fc.integer({min: 0, max: 4}),
    fc.integer({min: 0, max: 4}),
  );

  it('only finds neighbours that exist on the grid', () => {
    fc.assert(
      fc.property(arbitraryPoint, (point) => {
        const neighbours = getNeighbours(point);

        return neighbours.every(([col, row]) => {
          return col >= 0 && col <= 4 && row >= 0 && row <= 4;
        });
      }),
    );
  });

  it('does not include the point among the neighbours', () => {
    fc.assert(
      fc.property(arbitraryPoint, (point) => {
        const neighbours = getNeighbours(point);

        return neighbours.every(([col, row]) => {
          return !(col === point[0] && row === point[1]);
        });
      }),
    );
  });

  it('always produces 3, 5 or 8 neighbours', () => {
    fc.assert(
      fc.property(arbitraryPoint, (point) => {
        const neighbours = getNeighbours(point);

        return (
          neighbours.length === 3 ||
          neighbours.length === 5 ||
          neighbours.length === 8
        );
      }),
    );
  });

  test('no neighbour is more than one row or col away', () => {
    fc.assert(
      fc.property(arbitraryPoint, (point) => {
        const neighbours = getNeighbours(point);

        return neighbours.every(([col, row]) => {
          const c = point[0] - col;
          const r = point[1] - row;

          return c > -2 && c < 2 && r > -2 && r < 2;
        });
      }),
    );
  });
});

describe('a-star', () => {
  function eqNode(a: [number, number], b: [number, number]): boolean {
    return a[0] === b[0] && a[1] === b[1];
  }

  function heuristic(a: [number, number], b: [number, number]): number {
    return Math.hypot(a[0] - b[0], a[1] - b[1]);
  }

  test('the start is the goal', () => {
    // ┏━━━┓
    // ┃0,0┃
    // ┗━━━┛

    const grid = makeGrid(1, 1);
    const getNeighbours = makeGetNeighbours(grid);
    const start = grid[0]?.[0] as [number, number];
    const goal = grid[0]?.[0] as [number, number];

    const result = aStar({
      start,
      goal,
      getId,
      heuristic,
      getNeighbours,
      eqNode,
    });

    expect(result).toEqual({
      reachedGoal: true,
      path: [],
    });
  });

  test('straight path', () => {
    // ┏━━━┓
    // ┃0,0┃
    // ┣━━━┫
    // ┃0,1┃
    // ┣━━━┫
    // ┃0,2┃
    // ┣━━━┫
    // ┃0,3┃
    // ┣━━━┫
    // ┃0,4┃
    // ┗━━━┛

    const grid = makeGrid(1, 5);
    const getNeighbours = makeGetNeighbours(grid);
    const start = grid[0]?.[0] as [number, number];
    const goal = grid[0]?.[4] as [number, number];

    const result = aStar({
      start,
      goal,
      getId,
      heuristic,
      getNeighbours,
      eqNode,
    });

    expect(result).toEqual({
      reachedGoal: true,
      path: [
        [0, 4],
        [0, 3],
        [0, 2],
        [0, 1],
        [0, 0],
      ],
    });
  });

  test('optimal path', () => {
    // ┏━━━┳━━━┳━━━┳━━━┳━━━┓
    // ┃0,0┃1,0┃2,0┃3,0┃4,0┃
    // ┣━━━╋━━━╋━━━╋━━━╋━━━┫
    // ┃0,1┃1,1┃2,1┃3,1┃4,1┃
    // ┣━━━╋━━━╋━━━╋━━━╋━━━┫
    // ┃0,2┃1,2┃2,2┃3,2┃4,2┃
    // ┣━━━╋━━━╋━━━╋━━━╋━━━┫
    // ┃0,3┃1,3┃2,3┃3,3┃4,3┃
    // ┣━━━╋━━━╋━━━╋━━━╋━━━┫
    // ┃0,4┃1,4┃2,4┃3,4┃4,4┃
    // ┗━━━┻━━━┻━━━┻━━━┻━━━┛

    const grid = makeGrid(5, 5);
    const getNeighbours = makeGetNeighbours(grid);
    const start = grid[0]?.[0] as [number, number];
    const goal = grid[4]?.[4] as [number, number];

    const result = aStar({
      start,
      goal,
      getId,
      heuristic,
      getNeighbours,
      eqNode,
    });

    expect(result).toEqual({
      reachedGoal: true,
      path: [
        [4, 4],
        [3, 3],
        [2, 2],
        [1, 1],
        [0, 0],
      ],
    });
  });
});
