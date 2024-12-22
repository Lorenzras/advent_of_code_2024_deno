const singles: Record<string, boolean> = {}; // one letter patterns

const multiples: Record<string, string[]> = { // two or more letter patterns, organized by start
  "bb": [],
  "bg": [],
  "br": [],
  "bu": [],
  "bw": [],

  "gb": [],
  "gg": [],
  "gr": [],
  "gu": [],
  "gw": [],

  "rb": [],
  "rg": [],
  "rr": [],
  "ru": [],
  "rw": [],

  "ub": [],
  "ug": [],
  "ur": [],
  "uu": [],
  "uw": [],

  "wb": [],
  "wg": [],
  "wr": [],
  "wu": [],
  "ww": [],
};

const allTargets: string[] = [];

const cache: Record<string, number> = {}; // token: true/false

function processInput(input: string) {
  const sections = input.split("\n\n");

  const rawTarget = sections.pop();

  if (!rawTarget) return;

  const rawTargets = rawTarget.trim().split("\n");

  for (const rawTarget of rawTargets) allTargets.push(rawTarget.trim());

  const rawSection = sections.pop();

  if (!rawSection) return;

  const patterns = rawSection.trim().split(", ");

  for (const pattern of patterns) {
    if (pattern.length == 1) {
      singles[pattern] = true;
      continue;
    }

    const key = pattern.substr(0, 2);

    multiples[key].push(pattern);
  }
}

///////////////////////////////////////////////////////////////////////////////

function countWays(target: string) {
  if (cache[target] != undefined) return cache[target];

  if (target.length == 1) return (singles[target] == true) ? 1 : 0;

  let ways = 0;

  if (singles[target[0]] == true) ways += countWays(target.substr(1));

  const key = target.substr(0, 2);

  for (const pattern of multiples[key]) {
    if (!target.startsWith(pattern)) continue;

    const remain = target.replace(pattern, "");

    if (remain == "") {
      ways += 1;
      continue;
    }

    ways += countWays(remain);
  }

  cache[target] = ways;
  return ways;
}

export default function (input: string): number {
  processInput(input);

  let count = 0;

  for (const target of allTargets) count += countWays(target);

  console.log("the answer is", count);

  return count;
}
