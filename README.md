# A Star

[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

```
npm install @decoy9697/a-star
```

The library presumes you have some kind of linked structure
with a _start_ `Node` and an end `Node`. The `Node` structure can be whatever you like.

## Options

You will need to provide an options object to the `aStar` function, with the following keys:

| Key             | Type                      | Description                                                                                           |
| --------------- | ------------------------- | ----------------------------------------------------------------------------------------------------- |
| `start`         | `Node`                    | The starting node                                                                                     |
| `goal`          | `Node`                    | The goal node. The algorithm will _attempt_ to make an array of nodes from the `start` to the `goal`. |
| `getNeighbours` | `Node => Array<Node>`     | A function that finds the directly connected nodes for a given node                                   |
| `eqNode`        | `(Node, Node) => boolean` | A function for comparing two nodes (`true` if they are the same)                                      |
| `heuristic`     | `(Node, Node) => number`  | A function that determines the _cost_ of travelling from one node to the other.                       |

## Return type

| Key           | Type          | Description                                                     |
| ------------- | ------------- | --------------------------------------------------------------- |
| `path`        | `Array<Node>` | The path from the start to the goal (if possible)               |
| `reachedGoal` | `boolean`     | `true`, given the algorithm found a path from `start` to `goal` |

## Example

```
import aStar from "@decoy9697/a-star";

const result = aStar({
  start: node0,
  goal: node43,
  getNeighbours: (node) => { ... },
  eqNode: (nodeA, nodeB) => { ... },
  heuristic: (nodeA, nodeB ) => { ... }
});
```

<!-- Definitions -->

[downloads-badge]: https://img.shields.io/npm/dm/@decoy9697/a-star.svg
[downloads]: https://www.npmjs.com/package/@decoy9697/a-star
[size-badge]: https://img.shields.io/bundlephobia/minzip/@decoy9697/a-star.svg
[size]: https://bundlephobia.com/result?p=@decoy9697/a-star
