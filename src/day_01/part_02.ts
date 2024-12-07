/**
 * My mood now is to use reduce and hash map to solve this problem.
 */
export default function (pairs: string): number {
  const { left, rightMap } = pairs.split("\n").reduce<{
    left: number[];
    rightMap: Map<number, number>;
  }>(
    (acc, pair) => {
      const [l, r] = pair.split(/\s+/).map((x) => Number(x));

      acc.left.push(l);
      acc.rightMap.set(r, (acc.rightMap.get(r) ?? 0) + 1);

      return acc;
    },
    {
      left: [],
      rightMap: new Map(),
    }
  );

  const similarityScore = left.reduce((acc, curNum) => {
    const occurances = rightMap.get(curNum) ?? 0;
    return acc + curNum * occurances;
  }, 0);

  return similarityScore;
}
