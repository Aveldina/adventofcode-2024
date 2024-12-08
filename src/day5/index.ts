import test from "node:test";
import { Day } from "../day";

class Day5 extends Day {
  constructor() {
    super(5);
  }

  private applyPageOrderingRule = (orderingRule: string, pageList: string[]): number => {
    let orderingResult: number = 0; // default to out of order
    const [pageA, pageB] = orderingRule.split("|");
    const pageAIndex: number = pageList.indexOf(pageA);
    const pageBIndex: number = pageList.indexOf(pageB);

    if (pageAIndex == -1 || pageBIndex == -1) {
      orderingResult = -1; // not in list
    }

    if (pageAIndex < pageBIndex) {
      orderingResult = 1; // in order
    }

    return orderingResult;
  }

  private solveForRuleSetAndSinglePage = (orderingRules: string[], page: string): boolean => {
    let isPageInOrder: boolean = true;
    orderingRules.forEach((orderingRule: string) => {
      const pageList: string[] = page.split(",");
      const orderingResult: number = this.applyPageOrderingRule(orderingRule, pageList);
      if (orderingResult === 0) {
        // console.log(`ordering rule ${orderingRule} contains pages out of order ${page}`);
        isPageInOrder = false;
      }
      else if (orderingResult === -1) {
        // console.log(`ordering rule ${orderingRule} contains pages not in list ${page}`);  
      }
    });
    return isPageInOrder;
  }

  private findAndReturnMiddlePage = (page: string) => {
    const pageList: string[] = page.split(",");
    const middlePageIndex: number = Math.floor(pageList.length / 2);
    return pageList[middlePageIndex];
  }

  private repairPageOrdering = (orderingRules: string[], page: string): string => {
    let repairedPage: string = page;
    orderingRules.forEach((orderingRule: string) => {
      const pageList: string[] = repairedPage.split(",");
      const orderingResult: number = this.applyPageOrderingRule(orderingRule, pageList);
      if (orderingResult === 0) {
        // console.log(`ordering rule ${orderingRule} contains pages out of order ${page}`);
        const [pageA, pageB] = orderingRule.split("|");
        const pageAIndex: number = pageList.indexOf(pageA);
        const pageBIndex: number = pageList.indexOf(pageB);

        // console.log("swapping", pageList[pageAIndex], pageList[pageBIndex]);
        const tempPage: string = pageList[pageAIndex];
        pageList[pageAIndex] = pageList[pageBIndex];
        pageList[pageBIndex] = tempPage;
        repairedPage = pageList.join(",");
      }
    });
    return repairedPage;
  }

  solveForPartOne(input: string): string {
    const inputLines: string[] = input.split(/\r?\n/);
    let middlePageSum: number = 0;
    const pagesInOrder: string[] = [];

    const topSetIndex: number = inputLines.indexOf("");
    const orderingRules: string[] = inputLines.slice(0, inputLines.indexOf(""));
    const updateNumbers: string[] = inputLines.slice(topSetIndex + 1);

    updateNumbers.forEach((page: string) => {
      const isInOrder = this.solveForRuleSetAndSinglePage(orderingRules, page);
      // console.log(`page ${page} is in order: ${isInOrder}`);
      if (isInOrder) {
        pagesInOrder.push(page);
      }
    });

    // console.log(pagesInOrder);
    pagesInOrder.forEach((page: string) => {
      middlePageSum += parseInt(this.findAndReturnMiddlePage(page));
    });

    return middlePageSum.toString();
  }

  solveForPartTwo(input: string): string {
    const inputLines: string[] = input.split(/\r?\n/);
    let middlePageSum: number = 0;
    const pagesOutOfOrder: string[] = [];

    const topSetIndex: number = inputLines.indexOf("");
    const orderingRules: string[] = inputLines.slice(0, inputLines.indexOf(""));
    const updateNumbers: string[] = inputLines.slice(topSetIndex + 1);

    updateNumbers.forEach((page: string) => {
      const isInOrder = this.solveForRuleSetAndSinglePage(orderingRules, page);
      // console.log(`page ${page} is in order: ${isInOrder}`);
      if (!isInOrder) {
        pagesOutOfOrder.push(page);
      }
    });

    const repairedPages: string[] = [];
    // console.log(pagesOutOfOrder);

    pagesOutOfOrder.forEach((page: string): void => {
      let repairedPage: string = this.repairPageOrdering(orderingRules, page);
      let attempts = 0;

      while (!this.solveForRuleSetAndSinglePage(orderingRules, repairedPage)) {
        attempts++;
        // console.log(`repairing page ${repairedPage}`);
        repairedPage = this.repairPageOrdering(orderingRules, repairedPage);
        // console.log(`repaired page ${repairedPage}`);
        // console.log(`is repaired page in order? ${this.solveForRuleSetAndSinglePage(orderingRules, repairedPage)}`);
        if (attempts > 99) {
          console.log("too many attempts");
          break;
        }
      } 
      repairedPages.push(repairedPage);
    });

    repairedPages.forEach((page: string) => {
      middlePageSum += parseInt(this.findAndReturnMiddlePage(page));
    });

    return middlePageSum.toString();
  }
}

export default new Day5();
