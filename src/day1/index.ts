import { Day } from "../day";

class Day1 extends Day {
  constructor() {
    super(1);
  }

  solveForPartOne(input: string): string {
    const lines: string[] = input.split("\r\n");
    const items: string[][] = lines.map((line) => line.split("   "));
    const itemSet1: string[] = new Array();
    const itemSet2: string[] = new Array();

    items.forEach((item) => {
      itemSet1.push(item[0]);
      itemSet2.push(item[1]);
    });

    itemSet1.sort();
    itemSet2.sort();

    let sum: number = 0;
    for (let index = 0; index < itemSet1.length; index++) {
      const firstDistance: number = parseInt(itemSet1[index]);
      const secondDistance: number = parseInt(itemSet2[index]);

      const distance = firstDistance - secondDistance;
      sum += Math.abs(distance);
    }

    return sum.toString();
  }

  solveForPartTwo(input: string): string {
    return input;
  }
}

export default new Day1();
