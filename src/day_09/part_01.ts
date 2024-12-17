export type FreeSpace = ".";
export type FileId = number;
export type DiskRepresentation = (FreeSpace | FileId)[];

export function transformDiskMapToDisk(
  diskMapInput: number[]
): DiskRepresentation {
  console.log(diskMapInput);
  return diskMapInput.flatMap((number, currentIndex) => {
    return Array(number).fill(
      currentIndex % 2 === 0 ? Number(currentIndex) / 2 : "."
    );
  });
}

export function calculateChecksum(disk: (FreeSpace | FileId)[]): number {
  return disk.reduce((previousSum, currentNumber, currentFileId) => {
    return currentNumber === "."
      ? previousSum
      : Number(previousSum) + Number(currentNumber) * Number(currentFileId);
  }, 0) as number;
}

export const parseData = (input: string): number[] => {
  return input.split("").map((line) => Number(line));
};

export default function (input: string): number {
  const diskMapInput: number[] = parseData(input);

  const disk: DiskRepresentation = transformDiskMapToDisk(diskMapInput);

  for (let currentIndex = disk.length - 1; currentIndex > 0; currentIndex--) {
    if (disk[currentIndex] === ".") {
      continue;
    }

    const freeSlotIndex = disk.findIndex((value) => value === ".");

    if (freeSlotIndex > -1 && freeSlotIndex < currentIndex) {
      disk[freeSlotIndex] = disk[currentIndex];
      disk[currentIndex] = ".";
    }
  }

  return calculateChecksum(disk);
}
