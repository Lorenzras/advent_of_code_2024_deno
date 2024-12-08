import { parseInput } from "./part_01.ts";

enum Opt {
  ADD,
  MUL,
  CONCAT,
}

const operatorMapByLength: Map<number, Opt[][]> = new Map();

const generateCombinations = (length: number): Opt[][] => {
  const combinations: Opt[][] = [];
  const totalCombinations = 3 ** length;

  for (let i = 0; i < totalCombinations; i++) {
    const combination: Opt[] = [];
    let temp = i;
    for (let j = 0; j < length; j++) {
      const opt = temp % 3;
      combination.push(opt === 0 ? Opt.ADD : opt === 1 ? Opt.MUL : Opt.CONCAT);
      temp = Math.floor(temp / 3);
    }
    combinations.push(combination);
  }

  return combinations;
};

const applyOperators = (operators: Opt[], values: number[]): number => {
  let result = values[0];

  for (let i = 1; i < values.length; i++) {
    switch (operators[i - 1]) {
      case Opt.ADD:
        result += values[i];
        break;
      case Opt.MUL:
        result *= values[i];
        break;
      case Opt.CONCAT:
        result = Number(result.toString() + values[i].toString());
        break;
    }
  }

  return result;
};

export default function (input: string): number {
  const parsedInput = parseInput(input);
  let total = 0;

  for (const [result, values] of parsedInput) {
    const length = values.length - 1;

    if (!operatorMapByLength.has(length)) {
      operatorMapByLength.set(length, generateCombinations(length));
    }

    const optCombinations = operatorMapByLength.get(length)!;

    for (const optCombination of optCombinations) {
      const resultFromCombination = applyOperators(optCombination, values);
      if (resultFromCombination === result) {
        total += resultFromCombination;
        break;
      }
    }
  }

  return total;
}
