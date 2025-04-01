import { BaseballGamePlayer, IHistoryItem } from "../domain/BaseballGamePlayer";
import BaseBallNumber, { TBaseBallNumber } from "../domain/BaseBallNumber";
import { BaseballGameUtils } from "./BaseballGameUtils";

describe("BaseballGameUtils", () => {
  it("makeGameResult - 정답인 경우", () => {
    const result: IHistoryItem = {
      baseballNumber: new BaseBallNumber("123"),
      strike: 3,
      ball: 0,
    };
    expect(BaseballGameUtils.historyToResultString(result)).toBe(
      "123 : 정답입니다!"
    );
  });

  it("makeGameResult - 낫싱인 경우", () => {
    const result: IHistoryItem = {
      baseballNumber: new BaseBallNumber("456"),
      strike: 0,
      ball: 0,
    };
    expect(BaseballGameUtils.historyToResultString(result)).toBe("456 : 낫싱");
  });

  it("makeGameResult - 스트라이크와 볼이 있는 경우", () => {
    const result: IHistoryItem = {
      baseballNumber: new BaseBallNumber("145"),
      strike: 1,
      ball: 1,
    };
    expect(BaseballGameUtils.historyToResultString(result)).toBe(
      "145 : 1 스트라이크 1 볼"
    );
  });

  it("playerListToInfoString - 참여중인 사용자가 없는 경우", () => {
    const players: BaseballGamePlayer[] = [];
    expect(BaseballGameUtils.playerListToInfoString(players)).toBe(
      "참여중인 사용자가 없습니다."
    );
  });

  it("playerListToInfoString - 참여중인 사용자가 있는 경우", () => {
    const baseballGames: BaseballGamePlayer[] = [
      new BaseballGamePlayer({ name: "user1" }),
      new BaseballGamePlayer({ name: "user2" }),
    ];
    expect(BaseballGameUtils.playerListToInfoString(baseballGames)).toBe(
      "참여중인 사용자 목록:\nuser1, user2"
    );
  });
});
