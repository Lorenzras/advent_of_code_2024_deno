type Path = Map<string, Position & { steps: number }>;
export type Grid<T> = T[][];

export type GetNeighborsArgs<T> = {
  grid: Grid<T>;
  currentPos: Position;
  isNeighborAllowed?: (value: T, p: Position) => boolean;
  dirs?: Record<string, Position>;
};

export type Position = {
  y: number;
  x: number;
};

export const DIRS = {
  N: { y: -1, x: 0 },
  S: { y: 1, x: 0 },
  E: { y: 0, x: 1 },
  W: { y: 0, x: -1 },
} as const;

export function posId({ y, x }: Position) {
  return `${y},${x}`;
}

export function getNeighbors<T>({
  grid,
  currentPos,
  isNeighborAllowed,
  dirs,
}: GetNeighborsArgs<T>): Position[] {
  const { y, x } = currentPos;

  return Object.entries(dirs ?? DIRS)
    .map(([_dir, vector]) => ({
      y: y + vector.y,
      x: x + vector.x,
    }))
    .filter(
      ({ y, x }) =>
        y >= 0 &&
        x >= 0 &&
        y < grid.length &&
        x < grid[0].length &&
        (isNeighborAllowed?.(grid[y]?.[x], { y, x }) ?? true),
    );
}

export function parseInput(inputLines: string[]) {
  const grid: Grid<string> = inputLines.map((l) => l.split(""));

  let start: Position | undefined = undefined;
  let end: Position | undefined = undefined;

  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    for (let x = 0; x < row.length; x++) {
      if (row[x] === "S") {
        start = { y, x };
      }

      if (row[x] === "E") {
        end = { y, x };
      }
    }
  }

  if (!start) throw "no start point";
  if (!end) throw "no end point";

  return { grid, start, end };
}

export function findPath<T>(
  grid: Grid<T>,
  start: Position,
  end: Position,
): Path {
  const endPosId = posId(end);
  const path = new Map<string, Position & { steps: number }>();

  let steps = 0;
  path.set(posId(start), { ...start, steps });

  const queue: Position[] = [start];

  while (queue.length) {
    const currentPos = queue.shift()!;

    if (posId(currentPos) === endPosId) {
      return path;
    }

    getNeighbors({
      grid,
      currentPos,
      isNeighborAllowed: (value, pos) => value !== "#" && !path.has(posId(pos)),
    }).forEach((pos: Position) => {
      steps++;
      path.set(posId(pos), { ...pos, steps });
      queue.push(pos);
    });
  }

  return path;
}

export function solvePart(path: Path, maxCheatTime: number) {
  const cheats = findCheats(path, maxCheatTime);
  const numOfCheatsBySavedSteps = cheats.reduce<Record<number, number>>(
    (acc, savedSteps) => {
      if (acc[savedSteps] === undefined) {
        acc[savedSteps] = 0;
      }

      acc[savedSteps]++;

      return acc;
    },
    {},
  );

  const countOfCheatsWithOver100StepsSaved = Object.entries(
    numOfCheatsBySavedSteps,
  ).reduce((sum, [savedSteps, numberOfCheats]) => {
    if (Number(savedSteps) >= 100) {
      sum += numberOfCheats;
    }
    return sum;
  }, 0);

  return countOfCheatsWithOver100StepsSaved;
}

function findCheats(pathMap: Path, maxCheatTime: number) {
  const pathArr = [...pathMap.values()];
  const cheats = [];

  for (let i = 0; i < pathArr.length - 1; i++) {
    for (let j = i + 1; j < pathArr.length; j++) {
      const posA = pathArr[i];
      const posB = pathArr[j];
      const stepsSaved = posB.steps - posA.steps;
      const distance = Math.abs(posA.x - posB.x) + Math.abs(posA.y - posB.y);

      if (distance > maxCheatTime) {
        continue;
      }

      const saved = stepsSaved - distance;
      if (saved > 0) {
        cheats.push(saved);
      }
    }
  }

  return cheats;
}

export default function (input: string): number {
  const inputLines = input.replace(/\r\n/g, "\n").split("\n");
  const { grid, start, end } = parseInput(inputLines);

  const path = findPath(grid, start, end);

  return solvePart(path, 2);
}
