import BaseballPlayer from "../components/pages/BaseballPlayer";
import { BaseballGameController } from "./BaseballGameController";
import { BaseballGamePlayer } from "./BaseballGamePlayer";
import BaseBallNumber from "./BaseBallNumber";

describe("BaseballGameController", () => {
  let gameController: BaseballGameController;

  beforeEach(() => {
    gameController = new BaseballGameController({
      answer: new BaseBallNumber("123"),
    });
  });

  it("생성 시 - 초기값 확인", () => {
    expect(gameController.answer).toBeInstanceOf(BaseBallNumber);
    expect(gameController.winner).toBeNull();
  });

  it("checkRule 메서드", () => {
    expect(() => gameController.checkRule(3)).not.toThrow(
      "최대 플레이어 수를 초과했습니다."
    );
    expect(() => gameController.checkRule(4)).toThrow(
      "최대 플레이어 수를 초과했습니다."
    );
  });

  it("updateWinner 메서드 - 정답자 없는 경우", () => {
    const invalidPlayers = [
      new BaseballGamePlayer({
        name: "user1",
        history: [new BaseBallNumber("132"), new BaseBallNumber("456")],
      }),
      new BaseballGamePlayer({
        name: "user2",
        history: [new BaseBallNumber("492")],
      }),
    ];
    gameController = gameController.updateWinner(invalidPlayers);
    expect(gameController.winner).toBeNull();
  });

  it("updateWinner 메서드 - 정답자 있는 경우", () => {
    const validPlayers = [
      new BaseballGamePlayer({
        name: "user1",
        history: [new BaseBallNumber("132"), new BaseBallNumber("456")],
      }),
      new BaseballGamePlayer({
        name: "user2",
        history: [new BaseBallNumber("123")],
      }),
    ];
    gameController = gameController.updateWinner(validPlayers);
    expect(gameController.winner).not.toBeNull();
    expect(gameController.winner?.name).toBe("user2");
  });
});
