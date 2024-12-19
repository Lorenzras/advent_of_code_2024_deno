import solve from "./common.ts";

export default function (input: string): number {
  return solve(input.split("\n"), 1);
}
