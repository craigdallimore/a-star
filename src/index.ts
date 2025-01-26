import PQ, {LOW_FIRST} from '@decoy9697/priority-queue';

function reconstructPath<Node>(options: {
  eqNode: (a: Node, b: Node) => boolean;
  cameFrom: Map<string, Node | undefined>;
  getId: (a: Node) => string;
  start: Node;
  goal: Node;
}): {path: Node[]; reachedGoal: boolean} {
  const path = [];
  let current = options.goal;
  let reachedStart = options.eqNode(current, options.start);
  while (!reachedStart) {
    path.push(current);
    const next = options.cameFrom.get(options.getId(current));
    if (next) {
      current = next;
    } else {
      reachedStart = options.eqNode(current, options.start);
      break;
    }
  }

  return {path, reachedGoal: reachedStart};
}

export default function aStar<Node>(options: {
  start: Node;
  goal: Node;
  getId: (a: Node) => string;
  getNeighbours: (a: Node) => Node[];
  eqNode: (a: Node, b: Node) => boolean;
  heuristic: (a: Node, b: Node) => number;
}): {path: Node[]; reachedGoal: boolean} {
  const {start, goal, getNeighbours, heuristic, eqNode, getId} = options;

  const cameFrom = new Map<string, Node | undefined>();
  const costSoFar = new Map<string, number>();

  const startKey = getId(start);
  cameFrom.set(startKey, undefined);
  costSoFar.set(startKey, 0);

  const frontier = new PQ<Node>({sort: LOW_FIRST});

  frontier.insert(start, 0);

  while (!frontier.isEmpty()) {
    const current = frontier.pop();
    if (!current) {
      break;
    }

    if (eqNode(current, goal)) {
      break;
    }

    const currentKey = getId(current);

    const neighbours = getNeighbours(current);
    for (const neighbour of neighbours) {
      const neighbourKey = getId(neighbour);

      const currentCost = costSoFar.get(currentKey) ?? 0;
      const neighbourCost = costSoFar.get(neighbourKey) ?? 0;
      const newCost = currentCost + heuristic(current, neighbour);
      const hasVisitedNeighbour = costSoFar.has(neighbourKey);
      const isCheaper = newCost < neighbourCost;
      if (!hasVisitedNeighbour || isCheaper) {
        costSoFar.set(neighbourKey, newCost);
        const priority = newCost + heuristic(neighbour, goal);
        frontier.insert(neighbour, priority);
        cameFrom.set(neighbourKey, current);
      }
    }
  }

  return reconstructPath<Node>({eqNode, getId, cameFrom, start, goal});
}
