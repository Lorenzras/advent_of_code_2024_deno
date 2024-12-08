enum Opt {
  ADD,
  MUL,
}

const operatorMapByLength: Map<number, Opt[][]> = new Map();

const generateCombinations = (length: number): Opt[][] => {
  const combinations: Opt[][] = [];
  const totalCombinations = 2 ** length;

  for (let i = 0; i < totalCombinations; i++) {
    const combination: Opt[] = [];
    for (let j = 0; j < length; j++) {
      combination.push(i & (1 << j) ? Opt.MUL : Opt.ADD);
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
    }
  }

  return result;
};

export const parseInput = (input: string) => {
  const parsedInput: [number, number[]][] = input.split("\n").map((row) => {
    const [result, values] = row.split(": ");
    return [Number(result), values.split(" ").map(Number)];
  });

  return parsedInput;
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
