import { foundPath } from "./part_01.ts";

export default function (input: string): number {
  const map = input.trim().split("\n").map((row) => row.split(""));

  const directions = { "v": [1, 0], "^": [-1, 0], ">": [0, 1], "<": [0, -1] };

  const temp: Record<string, number> = {};

  const { paths } = foundPath(map, directions);

  paths.forEach((path) => {
    const parts = path.split(",");
    const newKey = parts.slice(0, 2).join(",");
    temp[newKey] = 1;
  });

  return Object.keys(temp).length;
}
