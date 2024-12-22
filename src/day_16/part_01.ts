type CheckPoint = {
  x?: number;
  y?: number;
  cost: number;
  path: string[];
  direction: string;
};

type Directions = {
  v: number[];
  "^": number[];
  ">": number[];
  "<": number[];
};

export function findOnMap(map: string[][], needle: string) {
  let x, y;
  for (let i = 0; i < map.length; i++) {
    y = map[i].indexOf(needle);
    if (y > -1) {
      x = i;
      break;
    }
  }
  return [x, y];
}

export function foundPath(map: string[][], directions: Directions) {
  const visited: Record<string, number> = {};
  let paths: string[] = [];
  const start = findOnMap(map, "S");
  const end = findOnMap(map, "E");
  let minCost = Infinity;

  const chekPoints: Array<CheckPoint> = [];
  const first: CheckPoint = {
    x: start[0],
    y: start[1],
    cost: 0,
    path: [],
    direction: ">",
  };
  chekPoints.push(first);

  while (chekPoints.length) {
    const current = chekPoints.shift();
    if (!current) break;

    const { x = 0, y = 0, direction } = current;
    const key = `${x},${y},${direction}`;
    current.path.push(key);

    if (current.x === end[0] && current.y === end[1]) {
      if (current.cost < minCost) {
        paths = [...current.path];
        minCost = current.cost;
      }
      if (current.cost === minCost) paths.push(...current.path);
      continue;
    }

    if (!(key in visited)) visited[key] = Infinity;
    if (visited[key] < current.cost) continue;
    visited[key] = current.cost;
    if (current.cost > minCost) continue;

    Object.entries(directions).forEach(([dname, [dx, dy]]) => {
      if (dname === "^" && direction === "v") return;
      if (dname === "v" && direction === "^") return;
      if (dname === "<" && direction === ">") return;
      if (dname === ">" && direction === "<") return;

      const nx = x + dx;
      const ny = y + dy;
      if (map[nx][ny] === "#") return;
      const isTurn = dname !== direction;
      chekPoints.push({
        x: nx,
        y: ny,
        cost: isTurn ? current.cost + 1001 : current.cost + 1,
        direction: dname,
        path: [...current.path],
      });
    });
  }
  return { paths, minCost };
}

/*
const temp = {};
paths.forEach((path) =>
  path.forEach((p) => {
    const parts = p.split(",");
    const newKey = parts.slice(0, 2).join(",");
    return temp[newKey] = 1;
  })
);
 */
// console.log("part2 =", Object.keys(temp).length);

export default function (input: string): number {
  const map = input.trim().split("\n").map((row) => row.split(""));

  const directions = { "v": [1, 0], "^": [-1, 0], ">": [0, 1], "<": [0, -1] };

  const { minCost, paths } = foundPath(map, directions);
  console.log("part1 = ", paths);

  return minCost;
}
