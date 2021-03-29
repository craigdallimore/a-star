// @flow
import PQ, { LOW_FIRST } from "@decoy9697/priority-queue";

function reconstructPath<Node>(opts: {
  matchLocation: (Node, Node) => boolean,
  cameFrom: Map<Node, ?Node>,
  start: Node,
  goal: Node,
}): { path: Array<Node>, reachedGoal: boolean } {
  const path = [];
  let current = opts.goal;
  let reachedStart = opts.matchLocation(current, opts.start);
  while (!reachedStart) {
    path.push(current);
    const next = opts.cameFrom.get(current);
    if (next) {
      current = next;
    } else {
      reachedStart = opts.matchLocation(current, opts.start);
      break;
    }
  }
  return { path, reachedGoal: reachedStart };
}

export default function aStar<Node>(opts: {
  start: Node,
  goal: Node,
  getNeighbours: (Node) => Array<Node>,
  matchLocation: (Node, Node) => boolean,
  heuristic: (Node, Node) => number,
}): { path: Array<Node>, reachedGoal: boolean } {
  const { start, goal, getNeighbours, heuristic, matchLocation } = opts;

  const cameFrom = new Map<Node, ?Node>();
  const costSoFar = new Map<Node, number>();

  cameFrom.set(start, null);
  costSoFar.set(start, 0);

  const frontier = new PQ<Node>({ sort: LOW_FIRST });

  frontier.insert(start, 0);

  while (!frontier.isEmpty()) {
    const current: ?Node = frontier.pop();
    if (!current) {
      break;
    }

    if (matchLocation(current, goal)) {
      break;
    }

    const neighbours = getNeighbours(current);
    for (let neighbour of neighbours) {
      const currentCost = costSoFar.get(current) || 0;
      const neighbourCost = costSoFar.get(neighbour) || 0;
      const newcost = currentCost + heuristic(current, neighbour);
      const hasVisitedNeighbour = costSoFar.has(neighbour);
      const hasLowerCost = newcost < neighbourCost;
      if (!hasVisitedNeighbour || hasLowerCost) {
        costSoFar.set(neighbour, newcost);
        const priority = newcost + heuristic(neighbour, goal);
        frontier.insert(neighbour, priority);
        cameFrom.set(neighbour, current);
      }
    }
  }

  return reconstructPath<Node>({ matchLocation, cameFrom, start, goal });
}
