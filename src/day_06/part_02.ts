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
  if (destination === "#" || destination === "O") {
    return destination;
  }
};

/**
 * Not in the problem, but I will print the matrix to see what it looks like.
 */
/* const printMatrix = (matrix: string[][]) => {
  console.log("matrix");
  for (let r = 0; r < matrix.length; r++) {
    console.log(matrix[r].join(""));
  }
  console.log("\n");
}; */

const move = (matrix: string[][], pos: number[], direction: Direction) => {
  let row = pos[0];
  let col = pos[1];

  matrix[row][col] = "X";

  let obstructionPos: number[] | undefined;

  const checkAndSetObstruction = (r: number, c: number) => {
    const obs = checkObstruction(matrix[r]?.[c]);
    if (obs) {
      obstructionPos = [r, c];
    }
    return obs;
  };

  switch (direction) {
    case "^": {
      if (checkAndSetObstruction(row - 1, col)) {
        if (checkAndSetObstruction(row, col + 1)) {
          direction = "v";
        } else {
          direction = ">";
          col++;
        }
      } else {
        row--;
      }
      break;
    }
    case ">": {
      if (checkAndSetObstruction(row, col + 1)) {
        if (checkAndSetObstruction(row + 1, col)) {
          direction = "<";
        } else {
          direction = "v";
          row++;
        }
      } else {
        col++;
      }
      break;
    }
    case "v":
      if (checkAndSetObstruction(row + 1, col)) {
        if (checkAndSetObstruction(row, col - 1)) {
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
      if (checkAndSetObstruction(row, col - 1)) {
        if (checkAndSetObstruction(row - 1, col)) {
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

  return { matrix, pos: [row, col], direction, obstructionPos };
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

const getDistinctPostionsOutOfGuardSight = (
  matrix: string[][],
  guardPos: [number, number]
) => {
  const [guardRow, guardCol] = guardPos;
  const distinctPosCoords: number[][] = [];
  matrix[guardRow][guardCol] = "G";

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
  initialPos: [number, number],
  initialDirection: Direction
) => {
  let totalLoops = 0;

  for (const [r, c] of distinctPos) {
    const freshMatrix = deepCopyMatrix(matrix);
    freshMatrix[r][c] = "O";

    const { isLoop } = patrol(freshMatrix, initialPos, initialDirection);
    if (isLoop) {
      totalLoops++;
    }
  }

  return totalLoops;
};

export const patrol = (
  matrix: string[][],
  pos: number[],
  initialDirection: Direction
) => {
  let row = pos[0];
  let col = pos[1];
  let direction = initialDirection;

  const obstructionMap = new Map<string, number>();

  while (
    row >= 0 &&
    row < matrix.length &&
    col >= 0 &&
    col < matrix[0].length
  ) {
    const {
      pos: [newRow, newCol],
      direction: newDirection,
      obstructionPos: newObstructionPos,
    } = move(matrix, [row, col], direction);

    row = newRow;
    col = newCol;
    direction = newDirection;

    if (newObstructionPos) {
      const key = `${newObstructionPos[0]}-${newObstructionPos[1]}`;
      if (!obstructionMap.has(key)) {
        obstructionMap.set(key, 0);
      } else {
        const collisionCount = obstructionMap.get(key)! + 1;
        obstructionMap.set(key, collisionCount);
        if (collisionCount > 3) {
          return {
            matrix,
            isLoop: true,
          };
        }
      }
    }
  }

  return {
    matrix,
    isLoop: false,
  };
};

export default function (input: string): number {
  const { matrix, pos, direction } = initMatrix(input);

  const matrixCopy = deepCopyMatrix(matrix);

  const { matrix: matrixWithPath } = patrol(matrixCopy, pos, direction);

  const distinctPosCoords = getDistinctPostionsOutOfGuardSight(
    matrixWithPath,
    pos
  );

  const possibleObstacles = countPossibleLoopObstacles(
    matrix,
    distinctPosCoords,
    pos,
    direction
  );

  return possibleObstacles;
}
