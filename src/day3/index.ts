import { Day } from "../day";

class Day3 extends Day {
  constructor() {
    super(3);
  }

  private findMultiplicationInstructions = (input: string, includeControl: boolean): string[] => {
    let multiPattern: RegExp = /mul\(\d{1,},\d{1,}\)/gi;
    if (includeControl) {
      multiPattern = /mul\(\d{1,},\d{1,}\)|do\(\)|don't\(\)/gi;
    }

    const resultArray: string[]|null = input.match(multiPattern);
    return resultArray ? resultArray : [];
  };

  private doMultiply(instruction: string): number {
    const numberPattern: RegExp = /\d{1,}/g;
    const numbers: string[] = instruction.match(numberPattern) || [];
    return parseInt(numbers[0]) * parseInt(numbers[1]);
  }

  solveForPartOne(input: string): string {
    const inputLines: string[] = input.split("\r\n");

    let runningCalc: number = 0;
    
    inputLines.forEach((line, index) => {
      const multiInstructions = this.findMultiplicationInstructions(line, false);
      multiInstructions.forEach((instruction) => {
        runningCalc += this.doMultiply(instruction);
      })
    });

    return runningCalc.toString();
  }

  solveForPartTwo(input: string): string {
    const inputLines: string[] = input.split("\r\n");
    let shouldMultiply: boolean = true;

    let runningCalc: number = 0;
    
    inputLines.forEach((line, index) => {
      const multiInstructions = this.findMultiplicationInstructions(line, true);
      multiInstructions.forEach((instruction) => {
        if (instruction.includes("do")) {
          shouldMultiply = true;
        }
        if (instruction.includes("don")) {
          shouldMultiply = false;
        }
        if (shouldMultiply && instruction.includes("mul")) {
          runningCalc += this.doMultiply(instruction);
        }
      })
    });

    return runningCalc.toString();
  }
}

export default new Day3();
