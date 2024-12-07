import { Day } from "../day";

class Day4 extends Day {
  constructor() {
    super(4);
  }

  private getIndicesOf(searchStr: string, str: string, caseSensitive: boolean = false): number[] {
    var startIndex = 0, index, indices = [];
    if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + 1;
    }
    return indices;
}

  private countWordsInString(input: string): number {
    const searchWordForward: RegExp = /xmas/ig;
    const searchWordBackwards: RegExp = /samx/ig;
    const forwardCount = this.getIndicesOf('xmas', input).length;
    const backwardsCount = this.getIndicesOf('samx', input).length;
    return forwardCount + backwardsCount;
  }

  solveForPartOne(input: string): string {
    let totalWordCount: number = 0;
    let wordArray: string[][] = input.split("\r\n").map((line) => line.split(""));

    // horizontal
    wordArray.forEach((line) => {
      totalWordCount += this.countWordsInString(line.join(""));
    });

    // vertical
    for (let i = 0; i < wordArray.length; i++) {
      let verticalString: string = "";
      for (let j = 0; j < wordArray.length; j++) {
        verticalString += wordArray[j][i];
      }
      totalWordCount += this.countWordsInString(verticalString);
    }

    for (let k = 0; k < wordArray.length; k++) {
      let diagonalString: string = "";
      for (let j = 0; j <= k; j++) {
        let inner = k - j;
        diagonalString += wordArray[inner][j];
      }
      totalWordCount += this.countWordsInString(diagonalString);
    }

    for (let k = wordArray.length-2; k >= 0; k--) {
      let diagonalString: string = "";
      for (let j = 0; j <= k; j++) {
        let inner = k - j;
        diagonalString += wordArray[wordArray.length - j - 1][wordArray.length - inner - 1];
      }
      totalWordCount += this.countWordsInString(diagonalString);
    }

    for (let k = wordArray.length - 1; k >= 0; k--) {
      let diagonalString: string = "";
      for (let j = 0; j <= k; j++) {
        let inner = k - j;
        diagonalString += wordArray[inner][j];
      }
      totalWordCount += this.countWordsInString(diagonalString);
    }
    
    for (let k = 0; k < wordArray.length - 1; k++) {
      let diagonalString: string = "";
      for (let j = 0; j <= k; j++) {
        let inner = k - j;
        diagonalString += wordArray[wordArray.length - j - 1][wordArray.length - inner - 1];
      }
      totalWordCount += this.countWordsInString(diagonalString);
    }

    return totalWordCount.toString();
  }

  solveForPartTwo(input: string): string {
    return input;
  }
}

export default new Day4();
