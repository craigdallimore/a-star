import PQ, { LOW_FIRST } from "@decoy9697/priority-queue";

function reconstructPath<Node>(opts: {
  eqNode: (a: Node, b: Node) => boolean;
  cameFrom: Map<Node, Node | null>;
  start: Node;
  goal: Node;
}): { path: Array<Node>; reachedGoal: boolean } {
  const path = [];
  let current = opts.goal;
  let reachedStart = opts.eqNode(current, opts.start);
  while (!reachedStart) {
    path.push(current);
    const next = opts.cameFrom.get(current);
    if (next) {
      current = next;
    } else {
      reachedStart = opts.eqNode(current, opts.start);
      break;
    }
  }
  return { path, reachedGoal: reachedStart };
}

export default function aStar<Node>(opts: {
  start: Node;
  goal: Node;
  getNeighbours: (a: Node) => Array<Node>;
  eqNode: (a: Node, b: Node) => boolean;
  heuristic: (a: Node, b: Node) => number;
}): { path: Array<Node>; reachedGoal: boolean } {
  const { start, goal, getNeighbours, heuristic, eqNode } = opts;

  const cameFrom = new Map<Node, Node | null>();
  const costSoFar = new Map<Node, number>();

  cameFrom.set(start, null);
  costSoFar.set(start, 0);

  const frontier = new PQ<Node>({ sort: LOW_FIRST });

  frontier.insert(start, 0);

  while (!frontier.isEmpty()) {
    const current = frontier.pop();
    if (!current) {
      break;
    }

    if (eqNode(current, goal)) {
      break;
    }

    const neighbours = getNeighbours(current);
    for (let neighbour of neighbours) {
      const currentCost = costSoFar.get(current) || 0;
      const neighbourCost = costSoFar.get(neighbour) || 0;
      const newCost = currentCost + heuristic(current, neighbour);
      const hasVisitedNeighbour = costSoFar.has(neighbour);
      const isCheaper = newCost < neighbourCost;
      if (!hasVisitedNeighbour || isCheaper) {
        costSoFar.set(neighbour, newCost);
        const priority = newCost + heuristic(neighbour, goal);
        frontier.insert(neighbour, priority);
        cameFrom.set(neighbour, current);
      }
    }
  }

  return reconstructPath<Node>({ eqNode, cameFrom, start, goal });
}
