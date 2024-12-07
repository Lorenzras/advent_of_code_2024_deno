import { assertEquals } from "@std/assert";

import f from "./part_02.ts";

Deno.test("should return 31 according to the sample in the problem", () => {
  const input = Deno.readTextFileSync(
    `${import.meta.dirname}/input_sample.txt`
  );

  assertEquals(f(input), 31);
});

Deno.test("should return correct answer for the official input data", () => {
  const input = Deno.readTextFileSync(`${import.meta.dirname}/input.txt`);

  const result = f(input);
  console.log("Result:", result);

  assertEquals(result, 20373490); // Adjust the pattern as needed
});
