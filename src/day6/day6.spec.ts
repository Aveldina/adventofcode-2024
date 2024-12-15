import day6 from "./index";

const sampleInput = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

const sampleExpected = '41';

const blockTest = `###
#^#
###`;

const blockExpected = '0';

describe("On Day 6", () => {
  it(`part1 solves puzzle input`, () => {
    expect(day6.solveForPartOne(sampleInput)).toBe(sampleExpected);
  });
});
