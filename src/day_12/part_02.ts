import { calculateMetrics, getInputLines, visitedKey } from "./part_01.ts";

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
}
