export const transformStone = (
  stoneValue: number,
  blinkCount: number,
  memo: Record<string, number> = {}
): number => {
  // Check memoization: if the result for this stone value and blink count is already computed, return it
  if (memo[`${stoneValue},${blinkCount}`])
    return memo[`${stoneValue},${blinkCount}`];

  // Base case: if no blinks are left, the stone count remains 1
  if (blinkCount === 0) return 1;

  // Blinking at a stone with value 0 transforms it into a stone with value 1
  if (stoneValue === 0) return transformStone(1, blinkCount - 1, memo);

  // Blinking at a stone with an odd number of digits multiplies the stone value by 2024
  if (stoneValue.toString().length % 2 !== 0)
    return transformStone(2024 * stoneValue, blinkCount - 1, memo);

  const stoneStr = stoneValue.toString();
  // Blinking at a stone with an even number of digits splits it into two stones, each with half the digits
  // Store the result in memo before returning
  return (memo[`${stoneValue},${blinkCount}`] =
    transformStone(
      parseInt(stoneStr.slice(0, stoneStr.length / 2)),
      blinkCount - 1,
      memo
    ) +
    transformStone(
      parseInt(stoneStr.slice(stoneStr.length / 2, stoneStr.length)),
      blinkCount - 1,
      memo
    ));
};

export const parseInput = (input: string) => {
  return input.split(" ").map(Number);
};

export default function (input: string): number {
  const data = parseInput(input);
  return data
    .map((stoneValue) => transformStone(stoneValue, 25))
    .reduce((total, stoneCount) => total + stoneCount);
}
