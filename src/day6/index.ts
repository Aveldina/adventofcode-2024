import { Day } from "../day";

class Day6 extends Day {
  constructor() {
    super(6);
  }

  private static curPosNode = '^';
  private static obstrNode = '#';
  private static emptyNode = '.';
  private static visitedNode = 'X';

  private static Directions = {
    up: 'U',
    down: 'D',
    left: 'L',
    right: 'R'
  };
  
  private print2DArray(array: string[][]): void {
    let output: string = '';
    array.forEach(row => {
      output += row.join('') + '\n';
    });
    // console.log(output);
  }

  private findLocationCursor(labMap: string[][], cursor: string): [number, number] {
    for (let i = 0; i < labMap.length; i++) {
      for (let j = 0; j < labMap[i].length; j++) {
        if (labMap[i][j] === cursor) {
          return [i, j];
        }
      }
    }
    return [-1, -1];
  }

  private findObjectAtLocation(labMap: string[][], row: number, col: number): string {
    if (row < 0 || row >= labMap.length || col < 0 || col >= labMap[0].length) {
      return '';
    }
    return labMap[row][col];
  }

  private isLocationWithinBounds(labMap: string[][], row: number, col: number): boolean {
    return row >= 0 && row < labMap.length && col >= 0 && col < labMap[0].length
  }

  private isLocationObstructed(labMap: string[][], row: number, col: number): boolean {
    return this.findObjectAtLocation(labMap, row, col) === Day6.obstrNode;
  }

  private updateCursorLocation(labMap: string[][], updateRow: number, updateCol: number): string[][] {
    const intialLocation = this.findLocationCursor(labMap, Day6.curPosNode);
    if (this.isLocationWithinBounds(labMap, updateRow, updateCol)) {
      if (!this.isLocationObstructed(labMap, updateRow, updateCol)) {
        labMap[updateRow][updateCol] = Day6.curPosNode;
        labMap[intialLocation[0]][intialLocation[1]] = Day6.visitedNode;
      }
    }
    return labMap;
  }

  private stepForwardAndUpdateMap(labMap: string[][], movementDirection: string): string[][] {
    let [curRow, curCol] = this.findLocationCursor(labMap, Day6.curPosNode);
    
    switch (movementDirection) {
      case Day6.Directions.up:
        curRow--;
        return this.updateCursorLocation(labMap, curRow, curCol);
      case Day6.Directions.down:
        curRow++;
        return this.updateCursorLocation(labMap, curRow, curCol);
      case Day6.Directions.left:
        curCol--;
        return this.updateCursorLocation(labMap, curRow, curCol);
      case Day6.Directions.right:
        curCol++;
        return this.updateCursorLocation(labMap, curRow, curCol);
      default:
        return labMap;
    }
  }

  private getNodeAtNextStep(labMap: string[][], movementDirection: string): string {
    let [curRow, curCol] = this.findLocationCursor(labMap, Day6.curPosNode);
    
    switch (movementDirection) {
      case Day6.Directions.up:
        curRow--;
        return this.findObjectAtLocation(labMap, curRow, curCol);
      case Day6.Directions.down:
        curRow++;
        return this.findObjectAtLocation(labMap, curRow, curCol);
      case Day6.Directions.left:
        curCol--;
        return this.findObjectAtLocation(labMap, curRow, curCol);
      case Day6.Directions.right:
        curCol++;
        return this.findObjectAtLocation(labMap, curRow, curCol);
      default:
        return '';
    }
  }

  private didCursorMove(labMap: string[][], updatedLabMap: string[][]): boolean {
    return labMap !== updatedLabMap;
  }

  private updateMovementDirection(currentDirection: string): string {
    switch (currentDirection) {
      case Day6.Directions.up:
        return Day6.Directions.right;
      case Day6.Directions.down:
        return Day6.Directions.left;
      case Day6.Directions.left:
        return Day6.Directions.up;
      case Day6.Directions.right:
        return Day6.Directions.down;
      default:
        return currentDirection;
    }
  }

  solveForPartOne(input: string): string {
    let solutionOutput = 0;
    
    const inputLines: string[] = input.split(/\r?\n/);
    let labMap: string[][] = inputLines.map((line) => line.split(""));
    
    this.print2DArray(labMap);

    const [startRow, startCol] = this.findLocationCursor(labMap, Day6.curPosNode);

    let workingDirection: string = Day6.Directions.up;
    let keepMoving = true;

    while(keepMoving) {
      const nextNode = this.getNodeAtNextStep(labMap, workingDirection);
      if (nextNode === Day6.emptyNode || nextNode === Day6.visitedNode) {
        labMap = this.stepForwardAndUpdateMap(labMap, workingDirection);
        if (nextNode === Day6.emptyNode) {
          solutionOutput++;
        }
      }
      else if (nextNode === Day6.obstrNode) {
        workingDirection = this.updateMovementDirection(workingDirection);
      }
      else {
        solutionOutput++;
        keepMoving = false;
      }
      this.print2DArray(labMap);
    }
    
    return solutionOutput.toString();
  }

  solveForPartTwo(input: string): string {
    let solutionOutput = 0;
    
    const inputLines: string[] = input.split(/\r?\n/);
    const baseLabMap: string[][] = inputLines.map((line) => line.split(""));
    let labMap: string[][] = Array.from(baseLabMap);
    
    this.print2DArray(labMap);

    // generate possible obstacle locations

    // run each possible obstacle location through the pathfinding algorithm
    // if the obstacle location would result in a looping path, increment the solutionOutput
    

    const [startRow, startCol] = this.findLocationCursor(labMap, Day6.curPosNode);

    let workingDirection: string = Day6.Directions.up;
    let keepMoving = true;

    while(keepMoving) {
      const nextNode = this.getNodeAtNextStep(labMap, workingDirection);
      if (nextNode === Day6.emptyNode || nextNode === Day6.visitedNode) {
        labMap = this.stepForwardAndUpdateMap(labMap, workingDirection);
        if (nextNode === Day6.emptyNode) {
          solutionOutput++;
        }
      }
      else if (nextNode === Day6.obstrNode) {
        workingDirection = this.updateMovementDirection(workingDirection);
      }
      else {
        solutionOutput++;
        keepMoving = false;
      }
      this.print2DArray(labMap);
    }
    
    return solutionOutput.toString();
  }
}

export default new Day6();
