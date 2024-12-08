import day5 from "./index";

const exampleInput = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

const exampleExpected = '143';
const exampleExpected2 = '123';

describe("On Day 5", () => {
  it(`part1 adds middle pages`, () => {
    expect(day5.solveForPartOne(exampleInput)).toBe(exampleExpected);
  });
  it(`part2 repairs and adds middle pages`, () => {
    expect(day5.solveForPartTwo(exampleInput)).toBe(exampleExpected2);
  });
});
