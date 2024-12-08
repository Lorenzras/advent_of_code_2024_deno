import { assertEquals } from "@std/assert";
import f from "./part_02.ts";

const testCases = [
  /*   {
    filename: "input_edgecase_01.txt",
    expected: 6,
  }, */
  /*   {
    filename: "input_edgecase_02.txt",
    expected: 6,
  }, */
  /*   {
    filename: "input_edgecase_03.txt",
    expected: 6,
  }, */
  {
    filename: "input_edgecase_04.txt",
    expected: 6,
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
