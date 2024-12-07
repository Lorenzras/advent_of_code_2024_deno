/**
 * Straightforward solution utilizing javascript's built-in functions.
 */
export default function (pairs: string): number {
  const rows = pairs.split("\n");
  let left: number[] = [];
  let right: number[] = [];
  let sum = 0;

  for (const row of rows) {
    const [l, r] = row.split(/\s+/).map((x) => Number(x));

    left.push(l);
    right.push(r);
  }

  left = left.sort();
  right = right.sort();

  for (let i = 0; i < left.length; i++) {
    sum += Math.abs(left[i] - right[i]);
  }

  return sum;
}
