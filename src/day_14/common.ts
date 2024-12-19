export default function solve(inputs: string[], part: number) {
  const mod = (n: number, d: number) => {
    return ((n % d) + d) % d; // Modulus that always returns positive
  };
  let quadrantCounts = [0, 0, 0, 0]; // Counting stars in each quadrant
  const grid: string[][] = [];
  for (let y = 0; y < 103; y++) grid.push(".".repeat(101).split("")); // Initialize the grid with empty space
  for (let time = 1; time <= (part === 1 ? 100 : Infinity); time++) {
    const tempGrid = grid.map((row) => [...row]); // Copy the grid for this time step
    for (const input of inputs) {
      let [x, y, dx, dy] = (input.match(/-?\d+/g) ?? []).map(Number); // Extract coordinates and deltas
      x = mod(x + dx * time, 101); // Update x position with wrapping
      y = mod(y + dy * time, 103); // Update y position with wrapping
      tempGrid[y][x] = "*"; // Place a star in the grid
      if (part === 1 && time === 100) {
        // Count stars in quadrants at time 100 for part 1
        if (y < 51 && x < 50) quadrantCounts[0]++;
        else if (y < 51 && x > 50) quadrantCounts[1]++;
        else if (y > 51 && x < 50) quadrantCounts[2]++;
        else if (y > 51 && x > 50) quadrantCounts[3]++;
      }
    }
    if (part === 2) {
      // Check for a line of stars in part 2
      if (
        tempGrid
          .map((row) => row.join(""))
          .join("\n")
          .includes("**********")
      ) {
        quadrantCounts = [time, 1, 1, 1]; // Found the line of stars, set the counts
        break;
      }
    }
  }
  return quadrantCounts.reduce((product, count) => product * count); // Multiply the counts for the final answer
}
