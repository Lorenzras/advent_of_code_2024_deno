import { convertToMatrix } from "./part_01.ts";

export const counXMases = (matrix: string[][]): number => {
  console.log(matrix);

  return 0;
};

export default function (input: string): number {
  const inputMatrix = convertToMatrix(input);
  const xmasCount = counXMases(inputMatrix);

  return xmasCount;
}
