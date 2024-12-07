const convertToMatrix = (input: string): string[][] => {
  return input.split("\n").map((x) => x.split(""));
};

const countWord = (matrix: string[][], word: string): number => {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const wordLength = word.length;

  let count = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // checkForward
      const maxForwardIndex = col + wordLength;
      if (maxForwardIndex <= rows) {
        const wordToCheck = matrix[row].slice(col, maxForwardIndex).join("");
        if (wordToCheck === word) {
          count++;
        }
      }

      // checkReverse
      const maxReverseIndex = col - wordLength + 1;
      if (maxReverseIndex >= 0) {
        const wordToCheckArr = [];

        for (let i = col; i >= maxReverseIndex; i--) {
          wordToCheckArr.push(matrix[row][i]);
        }

        const wordToCheck = wordToCheckArr.join("");

        if (wordToCheck === word) {
          count++;
        }
      }

      // checkDown
      const maxDownIndex = row + wordLength;
      if (maxDownIndex <= cols) {
        const wordToCheckArr = [];

        for (let i = row; i < maxDownIndex; i++) {
          wordToCheckArr.push(matrix[i][col]);
        }

        const wordToCheck = wordToCheckArr.join("");
        if (wordToCheck === word) {
          count++;
        }
      }

      // checkReverseUp
      const maxReverseUpIndex = row - wordLength + 1;
      if (maxReverseUpIndex >= 0) {
        const wordToCheckArr = [];

        for (let i = row; i >= maxReverseUpIndex; i--) {
          wordToCheckArr.push(matrix[i][col]);
        }

        const wordToCheck = wordToCheckArr.join("");
        if (wordToCheck === word) {
          count++;
        }
      }

      // checkDiagonalDownRight
      if (maxForwardIndex <= rows && maxDownIndex <= cols) {
        const wordToCheckArr = [];
        for (let i = 0; i < wordLength; i++) {
          wordToCheckArr.push(matrix[row + i][col + i]);
        }

        const wordToCheck = wordToCheckArr.join("");
        if (wordToCheck === word) {
          count++;
        }
      }

      // checkDiagonalDownLeft
      if (maxReverseIndex >= 0 && maxDownIndex <= cols) {
        const wordToCheckArr = [];
        for (let i = 0; i < wordLength; i++) {
          wordToCheckArr.push(matrix[row + i][col - i]);
        }

        const wordToCheck = wordToCheckArr.join("");
        if (wordToCheck === word) {
          count++;
        }
      }

      // checkDiagonalUpRight
      if (maxForwardIndex <= rows && maxReverseUpIndex >= 0) {
        const wordToCheckArr = [];
        for (let i = 0; i < wordLength; i++) {
          wordToCheckArr.push(matrix[row - i][col + i]);
        }

        const wordToCheck = wordToCheckArr.join("");
        if (wordToCheck === word) {
          count++;
        }
      }

      // checkDiagonalUpLeft
      if (maxReverseIndex >= 0 && maxReverseUpIndex >= 0) {
        const wordToCheckArr = [];
        for (let i = 0; i < wordLength; i++) {
          wordToCheckArr.push(matrix[row - i][col - i]);
        }

        const wordToCheck = wordToCheckArr.join("");
        if (wordToCheck === word) {
          count++;
        }
      }
    }
  }

  return count;
};

export default function (input: string): number {
  const inputMatrix = convertToMatrix(input);
  const xmasCount = countWord(inputMatrix, "XMAS");

  return xmasCount;
}
