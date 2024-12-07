import { assertEquals } from "@std/assert";

import f from "./part_01.ts";

Deno.test("should return 11 according to the sample in the problem", () => {
  const input = Deno.readTextFileSync(
    `${import.meta.dirname}/input_sample.txt`
  );

  assertEquals(f(input), 11);
});

Deno.test("should return correct answer for a single pair", () => {
  const input = "1 1";

  assertEquals(f(input), 0);
});

Deno.test("should return correct answer for the official input data", () => {
  const input = Deno.readTextFileSync(`${import.meta.dirname}/input.txt`);

  const result = f(input);

  assertEquals(result, 1722302);
});
