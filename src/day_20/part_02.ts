import { findPath, parseInput, solvePart } from "./part_01.ts";

export default function (input: string): number {
  const inputLines = input.replace(/\r\n/g, "\n").split("\n");
  const { grid, start, end } = parseInput(inputLines);

  const path = findPath(grid, start, end);

  return solvePart(path, 20);
}
