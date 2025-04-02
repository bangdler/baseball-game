import { BaseballGamePlayer } from "../domain/BaseballGamePlayer";
import BaseBallNumber from "../domain/BaseBallNumber";
import { BaseballGameUtils } from "./BaseballGameUtils";

describe("BaseballGameUtils", () => {
  const answer = new BaseBallNumber("123");
  it("historyToResultString - 정답인 경우", () => {
    const input = new BaseBallNumber("123");
    expect(BaseballGameUtils.historyToResultString(answer, input)).toBe(
      "123 : 정답입니다!"
    );
  });

  it("historyToResultString - 낫싱인 경우", () => {
    const input = new BaseBallNumber("456");

    expect(BaseballGameUtils.historyToResultString(answer, input)).toBe(
      "456 : 낫싱"
    );
  });

  it("historyToResultString - 스트라이크와 볼이 있는 경우", () => {
    const input = new BaseBallNumber("145");

    expect(BaseballGameUtils.historyToResultString(answer, input)).toBe(
      "145 : 1 스트라이크 0 볼"
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
