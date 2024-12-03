import day3 from "./index";

const sampleInput = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
const expected = "161";

const sampleInputPart2 = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
const expectedPart2 = "48";

describe("On Day 3", () => {
  it(`part1 finds multiplication instructions and runs them`, () => {
    expect(day3.solveForPartOne(sampleInput)).toBe(expected);
  });
  it(`part2 finds multiplication instructions and controls`, () => {
    expect(day3.solveForPartTwo(sampleInputPart2)).toBe(expectedPart2);
  });
});
