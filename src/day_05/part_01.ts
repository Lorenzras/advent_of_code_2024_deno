const organizeRules = (rawRules: string) => {
  const ruleItems = new Map<string, string[]>();

  rawRules.split("\n").forEach((x) => {
    const [before, after] = x.split("|");

    if (!ruleItems.has(before)) {
      ruleItems.set(before, []);
    }

    ruleItems.get(before)?.push(after);

    if (!ruleItems.has(after)) {
      ruleItems.set(after, []);
    }
  });

  return ruleItems;
};

export default function (input: string): number {
  const [rawRules, rawUpdates] = input.split("\n\n");

  const updates = rawUpdates.split("\n").map((x) => x.split(","));

  const rulesMap = organizeRules(rawRules);

  let correctUpdatesSum = 0;

  for (const updateRow of updates) {
    let isCorrectUpdate = true;
    for (let uIdx = 0; uIdx < updateRow.length; uIdx++) {
      const currRule = rulesMap.get(updateRow[uIdx]);
      for (let nextIdx = uIdx + 1; nextIdx < updateRow.length; nextIdx++) {
        const pivotItem = updateRow[nextIdx];
        if (!currRule?.includes(pivotItem)) {
          isCorrectUpdate = false;
          break;
        }
      }
    }

    if (isCorrectUpdate) {
      correctUpdatesSum += Number(updateRow[Math.floor(updateRow.length / 2)]);
    }
  }

  return correctUpdatesSum;
}
