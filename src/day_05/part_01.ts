const setRuleWeight = (rawRules: string) => {
  const ruleWeight = new Map<string, number>();

  rawRules.split("\n").forEach((x) => {
    const [before, after] = x.split("|");

    const currRuleWeight = ruleWeight.get(before) ?? 1;

    // Increment the weight of the 'before' rule
    ruleWeight.set(before, currRuleWeight + 1);

    // Ensure the 'after' rule has a weight of at least 1
    if (!ruleWeight.has(after)) {
      ruleWeight.set(after, 1);
    }
  });

  return ruleWeight;
};

export default function (input: string): number {
  const [rawRules, rawUpdates] = input.split("\n\n");

  const updates = rawUpdates.split("\n").map((x) => x.split(","));

  const ruleWeight = setRuleWeight(rawRules);

  let correctUpdatesSum = 0;

  for (const update of updates) {
    let prevUpdateWeight = ruleWeight.get(update[0]) ?? 0;
    let isCorrectUpdate = true;

    for (let uIdx = 1; uIdx < update.length; uIdx++) {
      const currUpdateItem = update[uIdx];

      if (!ruleWeight.has(currUpdateItem)) {
        // allow non-existent update
        continue;
      }

      const currentUpdateWeight = ruleWeight.get(currUpdateItem) ?? 0;

      if (prevUpdateWeight < currentUpdateWeight) {
        isCorrectUpdate = false;
        break;
      }

      prevUpdateWeight = ruleWeight.get(currUpdateItem) ?? 0;
    }

    if (isCorrectUpdate) {
      const middleNumber = Number(update[Math.floor(update.length / 2)] ?? 0);

      correctUpdatesSum += middleNumber;
    }
  }

  return correctUpdatesSum;
}
