const directionSymbols = ["^", "v", "<", ">"] as const;
const regex = /[\^v<>]/;

type Direction = (typeof directionSymbols)[number];

const findDirectionPosition = (rowStr: string): number => {
  const match = rowStr.match(regex);
  return match ? rowStr.indexOf(match[0]) : -1;
};

/**
 * Not in the problem, but I will print the matrix to see what it looks like.
 */
const printMatrix = (matrix: string[][]) => {
  console.log("matrix");
  for (let r = 0; r < matrix.length; r++) {
    console.log(matrix[r].join(""));
  }
  console.log("\n");
};

const patrol = (matrix: string[][], pos: number[], direction: Direction) => {
  let row = pos[0];
  let col = pos[1];

  matrix[row][col] = "X";

  switch (direction) {
    case "^":
      if (matrix[row - 1]?.[col] === "#") {
        direction = ">";
        col++;
      } else {
        row--;
      }
      break;
    case ">":
      if (matrix[row]?.[col + 1] === "#") {
        direction = "v";
        row++;
      } else {
        col++;
      }
      break;
    case "v":
      if (matrix[row + 1]?.[col] === "#") {
        direction = "<";
        col--;
      } else {
        row++;
      }
      break;
    case "<":
      if (matrix[row]?.[col - 1] === "#") {
        direction = "^";
        row--;
      } else {
        col--;
      }
      break;
  }

  if (row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length) {
    matrix[row][col] = direction;

    // printMatrix(matrix);
    return patrol(matrix, [row, col], direction);
  }

  return matrix;
};

const initMatrix = (input: string) => {
  const rows = input.split("\n");

  const matrix: string[][] = [];
  let pos = [0, 0];
  let direction: Direction = "^";

  for (let r = 0; r < rows[0].length; r++) {
    const colPos = findDirectionPosition(rows[r]);
    const rowArr = rows[r].split("");

    if (colPos !== -1) {
      pos = [r, colPos];
      direction = rows[r][colPos] as Direction;
    }

    matrix.push(rowArr);
  }

  return { matrix, pos, direction };
};

const countDistinctPositions = (matrix: string[][]): number => {
  let sum = 0;
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      if (matrix[r][c] === "X") {
        sum++;
      }
    }
  }

  return sum;
};

export default function (input: string): number {
  const { matrix, pos, direction } = initMatrix(input);

  const newMatrix = patrol(matrix, pos, direction);

  printMatrix(newMatrix);

  return countDistinctPositions(newMatrix);
}
