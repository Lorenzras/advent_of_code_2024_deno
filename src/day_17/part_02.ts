import { executeProgram } from "./part_01.ts";

export default function (input: string) {
  const instructions = input.split("\n\n")[1].split(": ")[1].split(",").map(
    (num) => BigInt(num),
  );

  // Recursively search for the correct initial value of register A until the desired output is achieved
  // The program only examines the lower three bits, so we need to try all possible combinations
  // This requires 8^i iterations to explore all options
  // Note: All values must be bigints due to the limitations of bitwise operations on large numbers
  const findInitialA = (value: bigint, current: number): bigint => {
    if (current < 0) return value;

    for (let i = value << 3n; i < (value << 3n) + 8n; i++) {
      const { output } = executeProgram(i, instructions);
      if (output[0] === instructions[current]) {
        const finalVal = findInitialA(i, current - 1);
        if (finalVal !== -1n) return finalVal;
      }
    }

    return -1n;
  };

  return findInitialA(0n, instructions.length - 1);
}
