export default function solve(inputs: string[], part: number) {
  let totalAnswer = 0; // The ultimate answer to everything (not 42 this time)
  for (const machine of inputs.join("\n").split("\n\n")) {
    const [coordX1, coordY1, coordX2, coordY2, coordX3, coordY3] = (
      machine.match(/\d+/g) ?? []
    ).map(
      (value, index) =>
        parseInt(value) + (part === 2 && index > 3 ? 10000000000000 : 0)
    );
    const coefficientA =
      (coordX3 * (coordX2 - coordY2) - coordX2 * (coordX3 - coordY3)) /
      (coordX1 * (coordX2 - coordY2) + coordX2 * (coordY1 - coordX1));
    const coefficientB = (coordX3 - coordX1 * coefficientA) / coordX2;
    if (
      coefficientA === Math.floor(coefficientA) &&
      coefficientB === Math.floor(coefficientB)
    ) {
      totalAnswer += coefficientA * 3 + coefficientB; // Adding some spice to the answer
    }
  }
  return totalAnswer; // Return the grand total answer
}
