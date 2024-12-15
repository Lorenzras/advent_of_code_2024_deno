import { parseInput, findAntinodes } from "./part_01.ts";

export default function (input: string): number {
  const grid = parseInput(input);
  const antinodes = findAntinodes(grid, true);
  return antinodes.size;
}
