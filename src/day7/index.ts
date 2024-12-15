import { Day } from "../day";

class Day7 extends Day {
  constructor() {
    super(7);
  }

  private operators: string[] = ['+', '*'];

  private parseInput(input: string): [number, number[]] {
    const splitInput = input.split(':');
    const calibrationResult = parseInt(splitInput[0]);
    const equationNumbers = splitInput[1].trim().split(' ').map((num) => parseInt(num));
    return [calibrationResult, equationNumbers];
  }
  
  private calculateEquation(equation: string): number {
    const splitEquation = equation.split(' ');

    let result = parseInt(splitEquation[0]); // start here

    for (let i = 1; i < splitEquation.length; i = i+2) {
      if (splitEquation[i] === '+') {
        result += parseInt(splitEquation[i + 1]);
      } else if (splitEquation[i] === '*') {
        result *= parseInt(splitEquation[i + 1]);
      }
    }
    return result;
  }


  solveForPartOne(input: string): string {
    let solutionOutput = 0;
    
    const inputLines: string[] = input.split(/\r?\n/);
    const testLine = [inputLines[1]];

    inputLines.forEach((line) => {
    let [expected, operands] = this.parseInput(line);
    // console.log(expected, operands);

    const permutations = new Array(
      Math.pow(this.operators.length, operands.length - 1)
    );

    let currentEquation = [];

    for (let i = 0; i < permutations.length; i++) {
      currentEquation.push(operands[0]);

      let num = i;
      for (let j = 1; j < operands.length; j++) {
        currentEquation.push(this.operators[Math.ceil(num % this.operators.length)]);
        num = Math.floor(num / this.operators.length);
        currentEquation.push(operands[j]);
      }

      permutations[i] = currentEquation;
      currentEquation = [];
    }

    // console.log(permutations);

    let matchingEquationExists = false;
    permutations.forEach((permutation) => {
      const equation = permutation.join(' ');
      const result = this.calculateEquation(equation);
      if (result === expected) {
        matchingEquationExists = true;
      }
    });
    solutionOutput += matchingEquationExists ? expected : 0;
  });
    return solutionOutput.toString();
  }

  solveForPartTwo(input: string): string {
    return input;
  }
}

export default new Day7();
