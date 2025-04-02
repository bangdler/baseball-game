import { BaseballGame } from "./BaseballGame";
import { BaseballGameController } from "./BaseballGameController";
import { BaseballGamePlayer } from "./BaseballGamePlayer";
import { BaseballGamePlayerManager } from "./BaseballGamePlayerManager";
import BaseBallNumber from "./BaseBallNumber";

describe("BaseballGame", () => {
  let game: BaseballGame;

  beforeEach(() => {
    game = new BaseballGame({
      gameController: new BaseballGameController({
        answer: new BaseBallNumber("123"),
      }),
      playerManager: new BaseballGamePlayerManager({
        players: [],
        activePlayerIdx: 0,
      }),
    });
  });

  it("Baseball 생성 시 - 초기값 확인", () => {
    expect(game.gameController).toBeInstanceOf(BaseballGameController);
    expect(game.playerManager).toBeInstanceOf(BaseballGamePlayerManager);
  });

  it("addPlayer 메서드 - 최대 플레이어 수 초과 시 에러 발생", () => {
    game = game.addPlayer("user1").addPlayer("user2").addPlayer("user3");
    expect(() => game.addPlayer("user4")).toThrow(
      "최대 플레이어 수를 초과했습니다."
    );
  });

  it("runPlayer 메서드 - 정답 시 winner 반영", () => {
    game = game.addPlayer("user1").addPlayer("user2");
    game = game.runPlayer("456");
    expect(game.gameController.winner).toBeNull();
    game = game.runPlayer("123");
    expect(game.gameController.winner).not.toBeNull();
    expect(game.gameController.winner?.name).toBe("user2");
  });

  it("removePlayer 메서드 - 정답자 삭제 시 winner null 처리", () => {
    game = game.addPlayer("user1").addPlayer("user2");
    game = game.runPlayer("123");
    expect(game.gameController.winner).not.toBeNull();
    expect(game.gameController.winner?.name).toBe("user1");
    game = game.removePlayer(game.playerManager.players[0].id);
    expect(game.playerManager.players.length).toBe(1);
    expect(game.gameController.winner).toBeNull();
  });

  it("reset 메서드 - 게임 초기화 확인", () => {
    game = game.addPlayer("user1").addPlayer("user2");
    game = game.runPlayer("123");
    expect(game.playerManager.players.length).toBe(2);
    expect(game.gameController.winner).not.toBeNull();
    const resetGame = game.reset();
    expect(resetGame.playerManager.players.length).toBe(2);
    expect(resetGame.gameController.winner).toBeNull();
  });
});
