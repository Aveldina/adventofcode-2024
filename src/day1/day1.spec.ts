import day1 from "./index";

describe("On Day 1", () => {
  it(`Part1 provides distance between 2 values`, () => {
    expect(
      day1.solveForPartOne(
        "3   4\r\n4   3\r\n2   5\r\n1   3\r\n3   9\r\n3   3",
      ),
    ).toBe("11");
  });

  it(`Part2 provides similarity score between 2 values`, () => {
    expect(
      day1.solveForPartTwo(
        "3   4\r\n4   3\r\n2   5\r\n1   3\r\n3   9\r\n3   3",
      ),
    ).toBe("31");
  });
});
