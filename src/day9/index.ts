import { Day } from "../day";

type FileBlockData = {
  idNumber: number;
  size: number;
  isFile: boolean;
  hasAttemptedMove: boolean;
};

class Day9 extends Day {
  constructor() {
    super(9);
  }

  private splitStringByFileSection(str: string): string[] {
    const result = [];
    for (let i = 0; i < str.length; i += 1) {
      result.push(str.substring(i, i + 1));
    }
    return result;
  }

  private setupFileBlockData(blocks: string[]): FileBlockData[] {
    let fileBlockData: FileBlockData[] = [];
    let fileIndex = 0;
    blocks.forEach((block, index) => {
      // if index is even number, it is a file
      if (index % 2 === 0) {
        const idNumber = fileIndex;
        const size = parseInt(block);
        for (let i = 0; i < size; i++) {
          fileBlockData.push({ idNumber, size: size, isFile: true, hasAttemptedMove: false });
        }
        fileIndex++;
      }
      // if index is odd number, it is a free space
      else {
        const idNumber = -1;
        const size = parseInt(block);
        for (let i = 0; i < size; i++) {
          fileBlockData.push({ idNumber, size: size, isFile: false, hasAttemptedMove: false });
        }
      }
    });
    return fileBlockData;
  }

  private moveEndFileBlockToFreeSpace(fileBlockData: FileBlockData[]): FileBlockData[] {
    let fileBlockDataCopy = [...fileBlockData];

    let blockToMove = { idNumber: -1, size: 1, isFile: false };
    let indexBlockToMove: number = 0;
    for (let i = fileBlockDataCopy.length - 1; i >= 0; i--) {
      if (fileBlockDataCopy[i].isFile) {
        blockToMove = fileBlockDataCopy[i];
        indexBlockToMove = i;
        break;
      }
    }

    // find the first free space that the block can fit into
    const freeSpaceIndex = fileBlockDataCopy.findIndex((block) => !block.isFile);

    // swap the file block with the free space
    if (freeSpaceIndex !== -1) {
      fileBlockDataCopy[indexBlockToMove] = { idNumber: -1, size: blockToMove.size, isFile: false, hasAttemptedMove: true };
      fileBlockDataCopy[freeSpaceIndex] = { ...blockToMove, hasAttemptedMove: true };
    }

    return fileBlockDataCopy;
  }

  private moveCompleteEndFileBlockToFreeSpace(fileBlockData: FileBlockData[]): FileBlockData[] {
    let fileBlockDataCopy = [...fileBlockData];

    let blockToMove = { idNumber: -1, size: 1, isFile: false };
    let indexBlockToMove: number = 0;
    for (let i = fileBlockDataCopy.length - 1; i >= 0; i--) {
      if (fileBlockDataCopy[i].isFile && !fileBlockDataCopy[i].hasAttemptedMove) {
        blockToMove = fileBlockDataCopy[i];
        indexBlockToMove = i;
        break;
      }
    }
    indexBlockToMove = indexBlockToMove - blockToMove.size + 1;
    console.log("Index to move: ", indexBlockToMove, blockToMove.size);

    // find the first free space that the block can fit into
    const freeSpaceIndex = fileBlockDataCopy.findIndex((block) => !block.isFile && block.size >= blockToMove.size);

    // swap the file block with the free space
        console.log("array length: ", fileBlockDataCopy.length);
    if (freeSpaceIndex !== -1) {
      for (let i = 0; i < blockToMove.size; i++) {
        console.log(i, blockToMove.size);
        console.log("Indexes: ", indexBlockToMove+i, freeSpaceIndex+i);
        fileBlockDataCopy[indexBlockToMove+i] = { idNumber: -1, size: blockToMove.size, isFile: false, hasAttemptedMove: true };
        fileBlockDataCopy[freeSpaceIndex+i] = { ...blockToMove, hasAttemptedMove: true };
        console.log("array length: ", fileBlockDataCopy.length);
      }
    } else {
      for (let i = 0; i < blockToMove.size; i++) {
        console.log(i, blockToMove.size);
        console.log("Indexes: ", indexBlockToMove+i, freeSpaceIndex+i);
        fileBlockDataCopy[indexBlockToMove+i] = { ...blockToMove, hasAttemptedMove: true };
      }
    }

    return fileBlockDataCopy;
  }

  private doFileBlocksHaveSpaceBetween(fileBlockData: FileBlockData[]): boolean {
    for (let i = 0; i < fileBlockData.length; i++) {
      if (!fileBlockData[i].isFile) {
        const nextBlock = fileBlockData[i + 1];
        if (nextBlock && nextBlock.isFile) {
          return true;
        }
      }
    }
    return false;
  }

  private calculateCheckSum(fileBlockData: FileBlockData[]): number {
    let checkSum = 0;
    for (let i = 0; i < fileBlockData.length; i++) {
      if (fileBlockData[i].isFile) {
        checkSum += fileBlockData[i].idNumber * i;
      }
    }
    return checkSum;
  }


  solveForPartOne(input: string): string {
    let solutionOutput = 0;
    
    const inputLines: string[] = input.split(/\r?\n/);
    const fileData = inputLines[0];

    let fileBlocks = this.splitStringByFileSection(fileData);
    let fileBlockData = this.setupFileBlockData(fileBlocks);

    let shouldContinueSorting = true;
    while (shouldContinueSorting) {
      fileBlockData = this.moveEndFileBlockToFreeSpace(fileBlockData);
      shouldContinueSorting = this.doFileBlocksHaveSpaceBetween(fileBlockData);
    }

    solutionOutput = this.calculateCheckSum(fileBlockData);

    return solutionOutput.toString();
  }

  solveForPartTwo(input: string): string {
    let solutionOutput = 0;
    
    const inputLines: string[] = input.split(/\r?\n/);
    const fileData = inputLines[0];

    let fileBlocks = this.splitStringByFileSection(fileData);
    let fileBlockData = this.setupFileBlockData(fileBlocks);
    console.log(fileBlockData);

    let shouldContinueSorting = true;
    for (let i = 0; i < 10; i++) {
      fileBlockData = this.moveCompleteEndFileBlockToFreeSpace(fileBlockData);
      shouldContinueSorting = this.doFileBlocksHaveSpaceBetween(fileBlockData);
      console.log(fileBlockData, shouldContinueSorting);
    }

    solutionOutput = this.calculateCheckSum(fileBlockData);

    return solutionOutput.toString();
  }
}

export default new Day9();
