export class TurnManagementUtils {
  static getNextIdx(curIdx: number, length: number): number {
    const nextIdx = curIdx + 1;
    if (nextIdx >= length) {
      return 0;
    }
    return nextIdx;
  }

  static getPrevIdx(curIdx: number, length: number): number {
    const prevIdx = curIdx - 1;
    if (prevIdx < 0) {
      return length - 1;
    }
    return prevIdx;
  }

  static getReconciledIdx(
    removeIdx: number,
    curIdx: number,
    length: number
  ): number {
    let reconciledIdx = curIdx;
    if (removeIdx < curIdx) {
      reconciledIdx = this.getPrevIdx(curIdx, length);
    }
    return reconciledIdx;
  }
}
