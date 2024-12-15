import day9 from "./index";

const sampleInput: string = '2333133121414131402';
// const sampleInput: string = '12345';

const expectedOutput: string = '1928';
const expectedOutput2: string = '2858';

describe("On Day 9", () => {
  it(`part1 is identity function`, () => {
    expect(day9.solveForPartOne(sampleInput)).toBe(expectedOutput);
  });
  
  it(`part2 is identity function`, () => {
    expect(day9.solveForPartTwo(sampleInput)).toBe(expectedOutput2);
  });
});
