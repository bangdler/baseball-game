import BaseballGame, { IHistoryItem } from "../domain/BaseballGame";
import BaseBallNumber, { TBaseBallNumber } from "../domain/BaseBallNumber";
import { BaseballGameUtils } from "./BaseballGameUtils";

describe("BaseballGameUtils", () => {
  it("makeGameResult - 정답인 경우", () => {
    const result: IHistoryItem = {
      input: [1, 2, 3],
      strike: 3,
      ball: 0,
    };
    expect(BaseballGameUtils.makeGameResult(result)).toBe("123 : 정답입니다!");
  });

  it("makeGameResult - 낫싱인 경우", () => {
    const result: IHistoryItem = {
      input: [4, 5, 6],
      strike: 0,
      ball: 0,
    };
    expect(BaseballGameUtils.makeGameResult(result)).toBe("456 : 낫싱");
  });

  it("makeGameResult - 스트라이크와 볼이 있는 경우", () => {
    const result: IHistoryItem = {
      input: [1, 4, 5],
      strike: 1,
      ball: 1,
    };
    expect(BaseballGameUtils.makeGameResult(result)).toBe(
      "145 : 1 스트라이크 1 볼"
    );
  });

  it("makeGamesInfo - 참여중인 사용자가 없는 경우", () => {
    const baseballGames: BaseballGame[] = [];
    expect(BaseballGameUtils.makeGamesInfo(baseballGames)).toBe(
      "참여중인 사용자가 없습니다."
    );
  });

  it("makeGamesInfo - 참여중인 사용자가 있는 경우", () => {
    const answer: BaseBallNumber = new BaseBallNumber("123");
    const baseballGames: BaseballGame[] = [
      new BaseballGame({ username: "user1", answer }),
      new BaseballGame({ username: "user2", answer }),
    ];
    expect(BaseballGameUtils.makeGamesInfo(baseballGames)).toBe(
      "참여중인 사용자 목록:\nuser1, user2"
    );
  });
});
