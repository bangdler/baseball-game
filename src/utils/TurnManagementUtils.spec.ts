import { TurnManagementUtils } from "./TurnManagementUtils";

describe("TurnManagementUtils", () => {
  it("getNextIdx 메서드 - 다음 인덱스 확인", () => {
    expect(TurnManagementUtils.getNextIdx(0, 2)).toBe(1);
    expect(TurnManagementUtils.getNextIdx(1, 2)).toBe(0);
  });

  it("getPrevIdx 메서드 - 이전 인덱스 확인", () => {
    expect(TurnManagementUtils.getPrevIdx(0, 2)).toBe(1);
    expect(TurnManagementUtils.getPrevIdx(1, 2)).toBe(0);
  });

  it("getReconciledIdx 메서드 - 인덱스 조정 확인", () => {
    expect(TurnManagementUtils.getReconciledIdx(0, 3, 5)).toBe(2);
    expect(TurnManagementUtils.getReconciledIdx(3, 3, 5)).toBe(3);
    expect(TurnManagementUtils.getReconciledIdx(4, 3, 5)).toBe(3);
  });
});
