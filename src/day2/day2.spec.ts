import day2 from "./index";

const example: string =
  "7 6 4 2 1\r\n1 2 7 8 9\r\n9 7 6 2 1\r\n1 3 2 4 5\r\n8 6 4 4 1\r\n1 3 6 7 9\r\n1 2 3 4 2\r\n5 4 3 2 4";
const example2: string = "7 6 4 2 1\r\n1 2 7 8 9\r\n";
const example3: string = "9 6 7 3 1\r\n";

describe("On Day 2", () => {
  it(`Part 1 should determine safe reports`, () => {
    expect(day2.solveForPartOne(example)).toBe("2");
  });

  it(`Part 2 should determine safe reports with tolerance`, () => {
    expect(day2.solveForPartTwo(example)).toBe("6");
  });
});
