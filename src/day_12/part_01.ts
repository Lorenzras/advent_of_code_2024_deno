export const isInGrid = (
  [row, col]: [number, number],
  totalRows: number,
  totalCols: number
) => row >= 0 && row < totalRows && col >= 0 && col < totalCols;

export const getInputLines = (input: string) => input.split("\n");

const directions = [
  { dr: -1, dc: 0 }, // move up
  { dr: 1, dc: 0 }, // move down
  { dr: 0, dc: -1 }, // move left
  { dr: 0, dc: 1 }, // move right
];

const cornerDirections = [
  { dir: "up", dr: -1, dc: 0 }, // move up
  { dir: "down", dr: 1, dc: 0 }, // move down
  { dir: "left", dr: 0, dc: -1 }, // move left
  { dir: "right", dr: 0, dc: 1 }, // move right
  { dir: "upleft", dr: -1, dc: -1 }, // move up left
  { dir: "upright", dr: -1, dc: 1 }, // move up right
  { dir: "downleft", dr: 1, dc: -1 }, // move down left
  { dir: "downright", dr: 1, dc: 1 }, // move down right
];

export const visitedKey = ({ row, col }: { row: number; col: number }) =>
  `${row},${col}`;

export const calculateMetrics = (
  { row, col }: { row: number; col: number },
  garden: string[],
  totalRows: number,
  totalCols: number,
  visited: Set<string>
) => {
  const isInGridAndSameSymbol = (
    { row, col }: { row: number; col: number },
    symbol: string
  ) =>
    isInGrid([row, col], totalRows, totalCols) && symbol === garden[row][col];

  const plotSymbol = garden[row][col];
  const queue = [{ row, col }];
  const plot = [];

  let perimeter = 0;

  while (queue.length > 0) {
    const { row, col } = queue.shift()!;
    if (
      !isInGrid([row, col], totalRows, totalCols) ||
      garden[row][col] !== plotSymbol
    ) {
      perimeter++;
      continue;
    }
    if (!visited.has(visitedKey({ row, col }))) {
      visited.add(visitedKey({ row, col }));
      plot.push({ row, col });
      for (const { dr, dc } of directions) {
        queue.push({ row: row + dr, col: col + dc });
      }
    }
  }

  const corners = plot.map(({ row, col }) => {
    // @ts-ignore works but too lazy for types
    const { up, down, left, right, upleft, upright, downleft, downright } =
      cornerDirections.reduce(
        (acc, { dir, dr, dc }) => ({
          ...acc,
          [dir]: isInGridAndSameSymbol(
            {
              row: row + dr,
              col: col + dc,
            },
            garden[row][col]
          ),
        }),
        {}
      );

    return Object.entries({
      concaveUpLeft: up && left && !upleft,
      concaveUpRight: up && right && !upright,
      concaveDownLeft: down && left && !downleft,
      concaveDownRight: down && right && !downright,
      convexUpLeft: !(up || left),
      convexUpRight: !(up || right),
      convexDownLeft: !(down || left),
      convexDownRight: !(down || right),
    })
      .filter(([_, val]) => val)
      .map(([name]) => name);
  });

  return {
    perimeter,
    area: plot.length,
    numberOfSides: corners.reduce(
      (sum, cornersAtPoint) => sum + cornersAtPoint.length,
      0
    ),
  };
};

const part2 = (filename: string) => {
  const garden = getInputLines(filename);
  const { rows, cols } = { rows: garden.length, cols: garden[0].length };

  const visited = new Set<string>();

  const points = Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => ({ row, col }))
  ).flat();

  return points
    .map(({ row, col }) => {
      if (!visited.has(visitedKey({ row, col }))) {
        const { numberOfSides, area } = calculateMetrics(
          { row, col },
          garden,
          rows,
          cols,
          visited
        );
        return { numberOfSides, area };
      }
    })
    .filter((measurement) => !!measurement)
    .reduce((sum, { numberOfSides, area }) => sum + numberOfSides * area, 0);
};

export default function (input: string): number {
  const garden = getInputLines(input);
  const { rows, cols } = { rows: garden.length, cols: garden[0].length };

  const visited = new Set<string>();

  const points = Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => ({ row, col }))
  ).flat();

  return points
    .map(({ row, col }) => {
      if (!visited.has(visitedKey({ row, col }))) {
        const { perimeter, area } = calculateMetrics(
          { row, col },
          garden,
          rows,
          cols,
          visited
        );
        return { perimeter, area };
      }
    })
    .filter((measurement) => !!measurement)
    .reduce((sum, { perimeter, area }) => sum + perimeter * area, 0);
}
