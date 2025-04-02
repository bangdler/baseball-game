import { BaseballGame } from "./BaseballGame";
import { BaseballGamePlayer } from "./BaseballGamePlayer";
import { BaseballGamePlayerManager } from "./BaseballGamePlayerManager";
import BaseBallNumber from "./BaseBallNumber";

describe("BaseballGame", () => {
  let game: BaseballGame;

  beforeEach(() => {
    game = new BaseballGame({
      answer: new BaseBallNumber("123"),
    });
  });

  it("BaseballGameManager 생성 시 - 초기값 확인", () => {
    expect(game.answer.numbers).toEqual([1, 2, 3]);
    expect(game.maxPlayerCount).toBe(3);
    expect(game.playerManager).toBeInstanceOf(BaseballGamePlayerManager);
    expect(game.winner).toBeNull();
  });

  it("BaseballGameManager 생성 시 - 잘못된 값 입력 시 에러 반환", () => {
    expect(
      () =>
        new BaseballGame({
          answer: new BaseBallNumber("123"),
          maxPlayerCount: 0,
        })
    ).toThrow("최대 플레이어수는 0 이하일 수 업습니다.");
    expect(
      () =>
        new BaseballGame({
          answer: new BaseBallNumber("123"),
          maxPlayerCount: 1,
          playerManager: new BaseballGamePlayerManager({
            players: [
              new BaseballGamePlayer({ name: "user1" }),
              new BaseballGamePlayer({ name: "user2" }),
            ],
            activePlayerIdx: 0,
          }),
        })
    ).toThrow("최대 플레이어 수를 초과했습니다.");
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
    expect(game.winner).toBeNull();
    game = game.runPlayer("123");
    expect(game.winner).not.toBeNull();
    expect(game.winner?.name).toBe("user2");
  });

  it("removePlayer 메서드 - 정답자 삭제 시 winner null 처리", () => {
    game = game.addPlayer("user1").addPlayer("user2");
    game = game.runPlayer("123");
    expect(game.winner).not.toBeNull();
    expect(game.winner?.name).toBe("user1");
    game = game.removePlayer(game.playerManager.players[0].id);
    expect(game.playerManager.players.length).toBe(1);
    expect(game.winner).toBeNull();
  });

  it("reset 메서드 - 게임 초기화 확인", () => {
    game = game.addPlayer("user1").addPlayer("user2");
    game = game.runPlayer("123");
    expect(game.playerManager.players.length).toBe(2);
    expect(game.winner).not.toBeNull();
    const resetGame = game.reset();
    expect(resetGame.playerManager.players.length).toBe(2);
    expect(resetGame.winner).toBeNull();
  });

  it("isEnd 메서드 - 게임 종료 여부 확인", () => {
    expect(game.isEnd()).toBe(false);
    game = game.addPlayer("user1");
    game = game.runPlayer("123");
    expect(game.isEnd()).toBe(true);
  });

  it("isMaxPlayerCount 메서드 - 최대 플레이어 수 초과 여부 확인", () => {
    game = game.addPlayer("user1");
    expect(game.isMaxPlayerCount()).toBe(false);
    game = game.addPlayer("user2").addPlayer("user3");
    expect(game.isMaxPlayerCount()).toBe(true);
  });
});
