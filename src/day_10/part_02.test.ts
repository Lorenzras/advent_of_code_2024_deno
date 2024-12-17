import { assertEquals } from "@std/assert";
import f from "./part_02.ts";

const testCases = [
  {
    filename: "input_sample.txt",
    expected: 81,
  },
  {
    filename: "input.txt",
    expected: 1058,
  },
];

for (const { filename, expected } of testCases) {
  Deno.test("should return the correct answer", () => {
    const input = Deno.readTextFileSync(`${import.meta.dirname}/${filename}`);

    const start = performance.now();
    const result = f(input);
    const end = performance.now();

    console.log(`Result: ${result} (${filename})`);
    console.log(`Runtime: ${end - start}ms (${filename})`);

    assertEquals(result, expected);
  });
}
