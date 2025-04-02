import { BaseballGamePlayer } from "./BaseballGamePlayer";
import BaseBallNumber from "./BaseBallNumber";

describe("BaseballGamePlayer", () => {
  let baseballGamePlayer: BaseballGamePlayer;

  beforeEach(() => {
    baseballGamePlayer = new BaseballGamePlayer({ name: "user1" });
  });

  it("생성 시 - 초기값 확인", () => {
    expect(baseballGamePlayer.id).toBeDefined();
    expect(baseballGamePlayer.name).toEqual("user1");
    expect(baseballGamePlayer.history).toEqual([]);
  });

  it("addHistory 메서드 - 히스토리 추가", () => {
    const histories: BaseBallNumber[] = [
      new BaseBallNumber("123"),
      new BaseBallNumber("456"),
    ];

    histories.forEach((history, idx) => {
      baseballGamePlayer = baseballGamePlayer.addHistory(history);
      expect(baseballGamePlayer.history.length).toBe(idx + 1);
      expect(baseballGamePlayer.history.at(-1)).toEqual(history);
    });
  });
});
