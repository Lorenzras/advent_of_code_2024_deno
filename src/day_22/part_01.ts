// Parse the input string into an array of numbers
export const parseInput = (input: string) =>
  input.split("\n").filter((line) => line !== "").map(Number);

// Generate the next number in the sequence using bitwise operations
export const generateNextNumber = (currentNumber: number): number => {
  // Perform a bitwise left shift on currentNumber by 6 bits, then XOR the result with the original currentNumber.
  // This operation introduces non-linearity and helps in generating a pseudo-random sequence.
  // Finally, apply a bitwise AND with 0xFFFFFF to ensure the result fits within 24 bits.
  currentNumber = (currentNumber ^ (currentNumber << 6)) & 0xFFFFFF;
  currentNumber = (currentNumber ^ (currentNumber >> 5)) & 0xFFFFFF;
  currentNumber = (currentNumber ^ (currentNumber << 11)) & 0xFFFFFF;
  return currentNumber;
};

export default function (input: string): number {
  // Parse the input to get the initial numbers
  const initialNumbers = parseInput(input);

  // Process each number to generate the sequence
  return initialNumbers.map((number) => {
    for (let i = 0; i < 2000; i++) {
      number = generateNextNumber(number);
    }
    return number;
  }).reduce((sum, current) => sum + current);
}
