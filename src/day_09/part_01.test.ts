import { assertEquals } from "@std/assert";
import f from "./part_01.ts";

const testCases = [
  {
    filename: "input_sample.txt",
    expected: 1928,
  },
  {
    filename: "input.txt",
    expected: 6337367222422,
  },
];

for (const { filename, expected } of testCases) {
  Deno.test("should return the correct answer", () => {
    const input = Deno.readTextFileSync(`${import.meta.dirname}/${filename}`);
    const result = f(input);
    console.log(`Result: ${result} (${filename})`);
    assertEquals(result, expected);
  });
}
