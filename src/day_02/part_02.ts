import { isSafe } from "./part_01.ts";

const removeAt = (numbers: number[], i: number): number[] => {
  return [...numbers.slice(0, i), ...numbers.slice(i + 1)];
};

const isToleratedAsSafe = (numbers: number[]): boolean => {
  for (let i = 0; i < numbers.length; i++) {
    const n = removeAt(numbers, i);
    if (isSafe(n)) {
      return true;
    }
  }

  return false;
};

export default function (input: string): number {
  const rows = input.split("\n");
  let safe = 0;

  for (const row of rows) {
    const numbers = row.split(/\s+/).map((x) => Number(x.trim()));

    if (isSafe(numbers) || isToleratedAsSafe(numbers)) {
      safe++;
    }
  }

  return safe;
}
