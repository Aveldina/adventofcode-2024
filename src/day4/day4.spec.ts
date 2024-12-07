import day4 from "./index";

const sampleInput = "MMMSXXMASM\r\nMSAMXMSMSA\r\nAMXSXMAAMM\r\nMSAMASMSMX\r\nXMASAMXAMM\r\nXXAMMXXAMA\r\nSMSMSASXSS\r\nSAXAMASAAA\r\nMAMMMXMMMM\r\nMXMXAXMASX";
const sampleInput2 = "ABC\r\nDEF\r\nGHI";
const expectedOutput = "18";

describe("On Day 4", () => {
  it(`part1 should find words`, () => {
    expect(day4.solveForPartOne(sampleInput)).toBe(expectedOutput);
  });
});
