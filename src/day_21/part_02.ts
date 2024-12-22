import { solver } from "./part_01.ts";

export default function (input: string): number {
  return solver(input.split("\n"), 25);
}
