const directionSymbols = ["^", "v", "<", ">"] as const;
const regex = /[\^v<>]/;

type Direction = (typeof directionSymbols)[number];

const deepCopyMatrix = (matrix: string[][]) => {
  return matrix.map((row) => [...row]);
};

const findDirectionPosition = (rowStr: string): number => {
  const match = rowStr.match(regex);
  return match ? rowStr.indexOf(match[0]) : -1;
};

const checkObstruction = (destination: string) => {
  if (destination === "#") {
    return 0;
  }
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

const move = (matrix: string[][], pos: number[], direction: Direction) => {
  let row = pos[0];
  let col = pos[1];

  matrix[row][col] = "X";

  switch (direction) {
    case "^":
      if (matrix[row - 1]?.[col] === "#") {
        if (matrix[row]?.[col + 1] === "#") {
          direction = "v";
        } else {
          direction = ">";
          col++;
        }
      } else {
        row--;
      }
      break;
    case ">":
      if (matrix[row]?.[col + 1] === "#") {
        if (matrix[row + 1]?.[col] === "#") {
          direction = "<";
        } else {
          direction = "v";
          row++;
        }
      } else {
        col++;
      }
      break;
    case "v":
      if (matrix[row + 1]?.[col] === "#") {
        if (matrix[row]?.[col - 1] === "#") {
          direction = "^";
        } else {
          direction = "<";
          col--;
        }
      } else {
        row++;
      }
      break;
    case "<":
      if (matrix[row]?.[col - 1] === "#") {
        if (matrix[row - 1]?.[col] === "#") {
          direction = ">";
        } else {
          direction = "^";
          row--;
        }
      } else {
        col--;
      }
      break;
  }

  if (matrix[row]?.[col]) {
    matrix[row][col] = direction;
  }

  return { matrix, pos: [row, col], direction };
};

const initMatrix = (input: string) => {
  const rows = input.split("\n");

  const matrix: string[][] = [];
  let pos: [number, number] = [0, 0];
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

const markLineOfSight = (
  matrix: string[][],
  startRow: number,
  startCol: number,
  rowStep: number,
  colStep: number
) => {
  let r = startRow;
  let c = startCol;

  while (r >= 0 && r < matrix.length && c >= 0 && c < matrix[0].length) {
    if (matrix[r][c] === "#") {
      break;
    }
    matrix[r][c] = "S";
    r += rowStep;
    c += colStep;
  }
};

const getDistinctPostionsOutOfGuardSight = (
  matrix: string[][],
  guardPos: [number, number],
  direction: Direction
) => {
  const [guardRow, guardCol] = guardPos;
  const distinctPosCoords: number[][] = [];

  switch (direction) {
    case "^":
      markLineOfSight(matrix, guardRow - 1, guardCol, -1, 0);
      break;
    case ">":
      markLineOfSight(matrix, guardRow, guardCol + 1, 0, 1);
      break;
    case "v":
      markLineOfSight(matrix, guardRow + 1, guardCol, 1, 0);
      break;
    case "<":
      markLineOfSight(matrix, guardRow, guardCol - 1, 0, -1);
      break;
  }

  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      if (matrix[r][c] === "X" && !(r === guardRow && c === guardCol)) {
        distinctPosCoords.push([r, c]);
      }
    }
  }

  return distinctPosCoords;
};

const countPossibleLoopObstacles = (
  matrix: string[][],
  distinctPos: number[][],
  initialDirection: Direction
) => {
  for (const [r, c] of distinctPos) {
    const freshMatrix = deepCopyMatrix(matrix);
    freshMatrix[r][c] = "O";
    // patrol(freshMatrix, [r, c], initialDirection);
    // printMatrix(freshMatrix);
  }

  return 0;
};

export const patrol = (
  matrix: string[][],
  pos: number[],
  initialDirection: Direction
) => {
  let row = pos[0];
  let col = pos[1];
  let direction = initialDirection;

  while (
    row >= 0 &&
    row < matrix.length &&
    col >= 0 &&
    col < matrix[0].length
  ) {
    const {
      pos: [newRow, newCol],
      direction: newDirection,
    } = move(matrix, [row, col], direction);

    printMatrix(matrix);
    row = newRow;
    col = newCol;
    direction = newDirection;
  }

  return matrix;
};

export default function (input: string): number {
  const { matrix, pos, direction } = initMatrix(input);

  const matrixCopy = deepCopyMatrix(matrix);

  const matrixWithPath = patrol(matrixCopy, pos, direction);

  printMatrix(matrixWithPath);

  const distinctPosCoords = getDistinctPostionsOutOfGuardSight(
    matrixWithPath,
    pos,
    direction
  );

  const possibleObstacles = countPossibleLoopObstacles(
    matrix,
    distinctPosCoords,
    direction
  );

  console.log(distinctPosCoords);

  return possibleObstacles;
}
