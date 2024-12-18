import { parseInput, transformStone } from "./part_01.ts";

export default function (input: string): number {
  const data = parseInput(input);
  return data
    .map((stoneNum) => transformStone(stoneNum, 75))
    .reduce((sum, numStones) => sum + numStones);
}
