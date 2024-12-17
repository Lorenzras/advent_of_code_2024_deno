import {
  countReachablePeaksFrom,
  findTrailHeads,
  parseInput,
} from "./part_01.ts";

export default function (input: string): number {
  const grid = parseInput(input);

  return findTrailHeads(grid)
    .map((trailHead) =>
      countReachablePeaksFrom(trailHead, grid, { uniquePaths: true })
    )
    .reduce((sum, trailHeadScore) => sum + trailHeadScore);
}
