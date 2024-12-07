export const counXMases = (matrix: string[][]): number => {
  console.log(matrix);

  return 0;
};

const containsMandS = (str: string): boolean => {
  return str.includes("M") && str.includes("S");
};

export default function (input: string): number {
  let count = 0;

  const inputRows = input.split("\n");

  for (let row = 1; row < inputRows.length - 1; row++) {
    const chars = inputRows[row];
    for (let cIdx = 1; cIdx < chars.length - 1; cIdx++) {
      const char = chars[cIdx];
      if (char === "A") {
        const prevRow = inputRows[row - 1];
        const nextRow = inputRows[row + 1];
        const topLeftChar = prevRow[cIdx - 1];
        const topRightChar = prevRow[cIdx + 1];
        const bottomLeftChar = nextRow[cIdx - 1];
        const bottomRightChar = nextRow[cIdx + 1];

        if (
          containsMandS(topLeftChar + bottomRightChar) &&
          containsMandS(topRightChar + bottomLeftChar)
        ) {
          count++;
        }
      }
    }
  }

  return count;
}
