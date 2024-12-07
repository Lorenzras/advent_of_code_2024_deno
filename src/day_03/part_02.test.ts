import { assertEquals } from "@std/assert";
import f from "./part_02.ts";

Deno.test(
  "should return the correct answer according to the sample in the problem",
  () => {
    const input = Deno.readTextFileSync(
      `${import.meta.dirname}/input_sample_part_2.txt`
    );

    assertEquals(f(input), 48);
  }
);

Deno.test(
  "should return the correct answer for the official input data",
  () => {
    const input = Deno.readTextFileSync(`${import.meta.dirname}/input.txt`);

    const result = f(input);

    console.log("Result:", result);

    assertEquals(result, 94455185);
  }
);
