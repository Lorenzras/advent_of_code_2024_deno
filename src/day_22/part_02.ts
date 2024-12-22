import { generateNextNumber, parseInput } from "./part_01.ts";

export default function (input: string): number {
  const ranges = new Map<string, number[]>();

  const prices = parseInput(input);

  prices.forEach((secretNumber) => {
    const visited = new Set<string>();
    const differences: number[] = [];

    for (let i = 0; i < 2000; i++) {
      const nextNumber = generateNextNumber(secretNumber);
      differences.push(Number((nextNumber % 10) - (secretNumber % 10)));
      secretNumber = nextNumber;

      if (differences.length === 4) {
        const key = differences.join(",");
        if (!visited.has(key)) {
          if (!ranges.has(key)) ranges.set(key, []);
          ranges.get(key)!.push(nextNumber % 10);
          visited.add(key);
        }
        differences.shift();
      }
    }
  });

  return Math.max(
    ...ranges.values().map((range) => range.reduce((lhs, rhs) => lhs + rhs)),
  );
}
