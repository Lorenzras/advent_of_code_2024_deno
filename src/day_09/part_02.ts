import {
  calculateChecksum,
  DiskRepresentation,
  parseData,
  transformDiskMapToDisk,
} from "./part_01.ts";

function howManyFilesWithId(
  disk: DiskRepresentation,
  currentIndex: number
): number {
  let count = 1;

  let j = currentIndex + 1;

  while (disk[j] === disk[currentIndex]) {
    count++;
    j++;
  }

  return count;
}

export default function (input: string): number {
  const diskMapInput: number[] = parseData(input);

  const disk: DiskRepresentation = transformDiskMapToDisk(diskMapInput);

  for (let num = Math.ceil(diskMapInput.length / 2) - 1; num >= 0; num--) {
    const idStartIndex = disk.indexOf(num),
      filesCount = howManyFilesWithId(disk, idStartIndex);

    for (let j = 0; j < idStartIndex; j++) {
      if (disk[j] === "." && howManyFilesWithId(disk, j) >= filesCount) {
        disk.splice(idStartIndex, filesCount, ...Array(filesCount).fill("."));
        disk.splice(j, filesCount, ...Array(filesCount).fill(num));

        break;
      }
    }
  }

  return calculateChecksum(disk);
}
