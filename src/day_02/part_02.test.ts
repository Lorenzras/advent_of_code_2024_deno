import { assertEquals } from "@std/assert/equals";
import f from "./part_02.ts";

Deno.test(
  "should return the correct answer according to the sample in the problem",
  () => {
    const input = Deno.readTextFileSync(
      `${import.meta.dirname}/input_sample.txt`
    );

    assertEquals(f(input), 4);
  }
);

Deno.test(
  "should return the correct answer for the official input data",
  () => {
    const input = Deno.readTextFileSync(`${import.meta.dirname}/input.txt`);

    const result = f(input);

    console.log("Result:", result);

    assertEquals(result, 528);
  }
);
