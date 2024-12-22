const allTargets: string[] = [];

const patternsBySize: Record<number, string[]> = {}; // { size: list }

const patternsByLetter: Record<string, string[]> = {}; // { letter: list }

const cache: Record<string, boolean> = {}; // token: true/false

function processInput(input: string) {
  const sections = input.split("\n\n");

  const rawTarget = sections.pop();

  if (!rawTarget) return;

  const rawTargets = rawTarget.trim().split("\n");

  for (const rawTarget of rawTargets) allTargets.push(rawTarget.trim());

  const rawPattern = sections.pop();

  if (!rawPattern) return;

  const patterns = rawPattern.trim().split(", ");

  for (const pattern of patterns) {
    const size = pattern.length;

    if (patternsBySize[size] == undefined) patternsBySize[size] = [];

    patternsBySize[size].push(pattern);
  }
}

///////////////////////////////////////////////////////////////////////////////

function simplifyPatterns() {
  const maxSize = Object.keys(patternsBySize).length;

  for (let size = 2; size <= maxSize; size++) simplifyPatternsThisSize(size);
}

function simplifyPatternsThisSize(size: number) {
  const newList = [];

  for (const pattern of patternsBySize[size]) {
    if (!isRedundant(pattern, 1)) newList.push(pattern);
  }

  patternsBySize[size] = newList;
}

function isRedundant(sourcePattern: string, reductor: number) {
  const maxSize = sourcePattern.length - reductor;

  for (let size = maxSize; size > 0; size--) { // decreasing
    for (const pattern of patternsBySize[size]) {
      if (!sourcePattern.startsWith(pattern)) continue;

      const remain = sourcePattern.replace(pattern, "");

      if (remain == "") return true;

      if (isRedundant(remain, 0)) return true;
    }
  }

  return false;
}

///////////////////////////////////////////////////////////////////////////////

function fillPatternsByLetter() {
  const maxSize = Object.keys(patternsBySize).length;

  for (let size = maxSize; size > 0; size--) { // decreasing
    for (const pattern of patternsBySize[size]) {
      const letter = pattern[0];

      if (patternsByLetter[letter] == undefined) patternsByLetter[letter] = [];

      patternsByLetter[letter].push(pattern);
    }
  }
}

///////////////////////////////////////////////////////////////////////////////

function isComposable(target: string) {
  if (cache[target] !== undefined) return cache[target];

  for (const pattern of patternsByLetter[target[0]]) {
    if (!target.startsWith(pattern)) continue;

    const remain = target.replace(pattern, "");

    if (remain == "") {
      cache[target] = true;
      return true;
    }

    if (isComposable(remain)) {
      cache[target] = true;
      return true;
    }
  }

  cache[target] = false;
  return false;
}

export default function (input: string): number {
  processInput(input);

  simplifyPatterns();

  fillPatternsByLetter();

  let count = 0;

  for (const target of allTargets) {
    if (isComposable(target)) count += 1;
  }

  console.log("the answer is", count);

  return count;
}
