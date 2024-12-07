const isOneDirection = (n: number[]): boolean => {
  let increasing = true;
  let decreasing = true;

  for (let i = 0; i < n.length - 1; i++) {
    if (n[i] > n[i + 1]) {
      increasing = false;
    }
    if (n[i] < n[i + 1]) {
      decreasing = false;
    }
  }

  return increasing || decreasing;
};

const isInRange = (n: number[], minDistance = 1, maxDistance = 3): boolean => {
  for (let i = 0; i < n.length - 1; i++) {
    const curNum = n[i];
    const nextNum = n[i + 1];
    const distance = Math.abs(curNum - nextNum);

    if (distance < minDistance || distance > maxDistance) {
      return false;
    }
  }

  return true;
};

export const isSafe = (n: number[]): boolean =>
  isOneDirection(n) && isInRange(n);

export default function (input: string): number {
  const rows = input.split("\n");
  let safe = 0;

  for (const row of rows) {
    const numbers = row.split(/\s+/).map((x) => Number(x.trim()));

    if (isSafe(numbers)) {
      safe++;
    }
  }

  return safe;
}
