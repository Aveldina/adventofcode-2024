import { Day } from "../day";

class Day2 extends Day {
  constructor() {
    super(2);
  }

  private isRowSafe = function(row: string): boolean {
    let isSafe: boolean = true;
    let ascendingNumbers: boolean = true;
    const numbers: number[] = row.split(" ").map((num) => parseInt(num));

    if (numbers[0] > numbers[1]) {
      ascendingNumbers = false;
    }

    numbers.forEach((currentNum, index) => {
      if (index === numbers.length - 1) {
        return; // Stop on the last item
      }
      const nextNum: number = numbers[index + 1];

      // direction check
      if (ascendingNumbers && currentNum > nextNum) {
        isSafe = false;
      }
      if (!ascendingNumbers && currentNum < nextNum) {
        isSafe = false;
      }
      // distance check
      const difference: number = Math.abs(currentNum - nextNum);
    
      if (difference < 1 || difference > 3) {
        isSafe = false;
      }
    });
    return isSafe;
  }

  private isRowSafeNumbers = function(numbers: number[]): boolean {
    let isSafe: boolean = true;
    let ascendingNumbers: boolean = true;

    if (numbers[0] > numbers[1]) {
      ascendingNumbers = false;
    }

    numbers.forEach((currentNum, index) => {
      if (index === numbers.length - 1) {
        return; // Stop on the last item
      }
      const nextNum: number = numbers[index + 1];

      // direction check
      if (ascendingNumbers && currentNum > nextNum) {
        isSafe = false;
      }
      if (!ascendingNumbers && currentNum < nextNum) {
        isSafe = false;
      }
      // distance check
      const difference: number = Math.abs(currentNum - nextNum);
    
      if (difference < 1 || difference > 3) {
        isSafe = false;
      }
    });
    return isSafe;
  }


  solveForPartOne(input: string): string {
    const lines: string[] = input.split("\r\n");
    let safeReports: number = 0;
    lines.forEach((line) => {
      const rowSafe = this.isRowSafe(line);
      if (!rowSafe) {
      }
      if (rowSafe) {
        safeReports++;
      }
    });

    return safeReports.toString();
  }

  solveForPartTwo(input: string): string {
    
    const lines: string[] = input.split("\r\n");
    let safeReports: number = 0;
    lines.forEach((line) => {
      const numbers: number[] = line.split(" ").map((num) => parseInt(num));

      const originalLineSafety = this.isRowSafe(line);
      if (originalLineSafety) {
        safeReports++;
        return;
      }

      // for the length of the numbers
      // try each set of numbers with one number removed
      // track how many sets of numbers are valid
      let safeLines: number = 0;

      for (let index = 0; index < numbers.length; index++) {
        let testNumbers: number[] = Array.from(numbers);
        testNumbers.splice(index, 1);

        const isSafe = this.isRowSafeNumbers(testNumbers);
        // console.log("Safe: ", isSafe);
        if (isSafe) {
          safeLines++;
        }
      }

      const rowSafe = this.isRowSafe(line);
      if (safeLines < 1) {
        // console.log("Failure - Safe Lines: ", safeLines);
      }
      if (safeLines >= 1) {
        // console.log("Success - Safe Lines: ", safeLines);
        safeReports++;
      }
    });

    return safeReports.toString();
  }
}

export default new Day2();
