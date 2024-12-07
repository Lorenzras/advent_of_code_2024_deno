import { assertEquals } from "@std/assert";
import f from "./part_02.ts";

const testCases = [
  {
    filename: "input_sample_part_2.txt",
    expected: 48,
  },
  {
    filename: "input.txt",
    expected: 94455185,
  },
  // Add more test cases here
];

for (const { filename, expected } of testCases) {
  Deno.test("should return the correct answer", () => {
    const input = Deno.readTextFileSync(`${import.meta.dirname}/${filename}`);
    const result = f(input);
    console.log(`Result: ${result} (${filename})`);
    assertEquals(result, expected);
  });
}
