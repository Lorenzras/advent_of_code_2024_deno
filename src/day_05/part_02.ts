// This is a messy solution, but it did the job. XD

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

const checkUpdateRow = (
  updateRow: string[],
  rulesMap: Map<string, string[]>
) => {
  for (let curIdx = 0; curIdx < updateRow.length; curIdx++) {
    const currRule = rulesMap.get(updateRow[curIdx]);
    for (let nextIdx = curIdx + 1; nextIdx < updateRow.length; nextIdx++) {
      const pivotItem = updateRow[nextIdx];
      if (!currRule?.includes(pivotItem)) {
        return {
          isCorrectUpdate: false,
          currIdx: curIdx,
          nextIdx: nextIdx,
        };
      }
    }
  }

  return {
    isCorrectUpdate: true,
    currIdx: -1,
    nextIdx: -1,
  };
};

const swap = (updateRow: string[], currIdx: number, nextIdx: number) => {
  const temp = updateRow[currIdx];
  updateRow[currIdx] = updateRow[nextIdx];
  updateRow[nextIdx] = temp;

  return updateRow;
};

const updateCorrection = (
  updateRow: string[],
  rulesMap: Map<string, string[]>,
  currIdx: number,
  nextIdx: number
) => {
  let isCorrectUpdate = false;

  let newUpdateRow = swap(updateRow, currIdx, nextIdx);

  while (!isCorrectUpdate && currIdx < updateRow.length) {
    const {
      isCorrectUpdate: newIsCorrectUpdate,
      currIdx,
      nextIdx,
    } = checkUpdateRow(newUpdateRow, rulesMap);

    isCorrectUpdate = newIsCorrectUpdate;

    if (!isCorrectUpdate) {
      newUpdateRow = swap(newUpdateRow, currIdx, nextIdx);
    }
  }

  return newUpdateRow;
};

export default function (input: string): number {
  const [rawRules, rawUpdates] = input.split("\n\n");

  const updates = rawUpdates.split("\n").map((x) => x.split(","));

  const rulesMap = organizeRules(rawRules);

  let correctUpdatesSum = 0;

  for (const updateRow of updates) {
    const { isCorrectUpdate, currIdx, nextIdx } = checkUpdateRow(
      updateRow,
      rulesMap
    );

    if (!isCorrectUpdate) {
      const correctRow = updateCorrection(
        updateRow,
        rulesMap,
        currIdx,
        nextIdx
      );

      correctUpdatesSum += Number(
        correctRow[Math.floor(correctRow.length / 2)] ?? 0
      );
    }
  }

  return correctUpdatesSum;
}
