import { BaseballGameManager } from "./BaseballGameManager";
import { BaseballGamePlayer } from "./BaseballGamePlayer";
import BaseBallNumber from "./BaseBallNumber";

describe("BaseballGameManager", () => {
  let gameManager: BaseballGameManager;

  beforeEach(() => {
    gameManager = new BaseballGameManager({
      answer: new BaseBallNumber("123"),
    });
  });

  it("BaseballGameManager 생성 시 - 초기값 확인", () => {
    expect(gameManager.answer.numbers).toEqual([1, 2, 3]);
    expect(gameManager.maxPlayerCount).toBe(3);
    expect(gameManager.players).toEqual([]);
    expect(gameManager.activePlayerIdx).toBe(0);
    expect(gameManager.winner).toBeNull();
  });

  it("BaseballGameManager 생성 시 - 잘못된 값 입력 시 에러 반환", () => {
    expect(
      () =>
        new BaseballGameManager({
          answer: new BaseBallNumber("123"),
          maxPlayerCount: 0,
        })
    ).toThrow("최대 플레이어수는 0 이하일 수 업습니다.");
    expect(
      () =>
        new BaseballGameManager({
          answer: new BaseBallNumber("123"),
          maxPlayerCount: 1,
          players: [
            new BaseballGamePlayer({ name: "user1" }),
            new BaseballGamePlayer({ name: "user2" }),
          ],
        })
    ).toThrow("최대 플레이어 수를 초과했습니다.");
  });

  it("addPlayer 메서드 - 플레이어 추가 시 players 배열 추가", () => {
    gameManager = gameManager.addPlayer("user1").addPlayer("user2");
    expect(gameManager.players.length).toBe(2);
    expect(gameManager.players[0].name).toBe("user1");
    expect(gameManager.players[1].name).toBe("user2");
  });

  it("addPlayer 메서드 - 최대 플레이어 수 초과 시 에러 발생", () => {
    gameManager = gameManager
      .addPlayer("user1")
      .addPlayer("user2")
      .addPlayer("user3");
    expect(() => gameManager.addPlayer("user4")).toThrow(
      "최대 플레이어 수를 초과했습니다."
    );
  });

  it("runPlayer 메서드 - 실행 시 ActiveIdx에 해당하는 Player History 누적", () => {
    gameManager = gameManager.addPlayer("user1").addPlayer("user2");
    gameManager = gameManager.runPlayer("123").runPlayer("456");
    expect(gameManager.players[0].history).toEqual([
      { baseballNumber: new BaseBallNumber("123"), strike: 3, ball: 0 },
    ]);
    expect(gameManager.players[1].history).toEqual([
      { baseballNumber: new BaseBallNumber("456"), strike: 0, ball: 0 },
    ]);
  });

  it("removePlayer 메서드 - 플레이어 삭제 시 players 배열에서 제거", () => {
    gameManager = gameManager.addPlayer("user1").addPlayer("user2");
    expect(gameManager.players.length).toBe(2);
    gameManager = gameManager.removePlayer(gameManager.players[0].id);
    expect(gameManager.players.length).toBe(1);
    expect(gameManager.players[0].name).toBe("user2");
  });

  it("removePlayer 메서드 - 없는 플레이어 삭제 시 에러 반환", () => {
    gameManager = gameManager.addPlayer("user1").addPlayer("user2");
    expect(gameManager.players.length).toBe(2);
    expect(() => gameManager.removePlayer("111")).toThrow(
      "존재하지 않는 플레이어입니다."
    );
  });

  it("reset 메서드 - 게임 초기화 확인", () => {
    gameManager = gameManager.addPlayer("user1").addPlayer("user2");
    gameManager = gameManager.runPlayer("123").runPlayer("456");
    expect(gameManager.players[0].history.length).toBe(1);
    expect(gameManager.players[1].history.length).toBe(1);
    const resetGameManager = gameManager.reset();
    expect(resetGameManager.players[0].history.length).toBe(0);
    expect(resetGameManager.players[1].history.length).toBe(0);
  });

  it("isEnd 메서드 - 게임 종료 여부 확인", () => {
    expect(gameManager.isEnd()).toBe(false);
    gameManager = gameManager.addPlayer("user1");
    gameManager = gameManager.runPlayer("123");
    expect(gameManager.isEnd()).toBe(true);
  });

  it("isMaxPlayerCount 메서드 - 최대 플레이어 수 초과 여부 확인", () => {
    gameManager = gameManager.addPlayer("user1");
    expect(gameManager.isMaxPlayerCount()).toBe(false);
    gameManager = gameManager.addPlayer("user2").addPlayer("user3");
    expect(gameManager.isMaxPlayerCount()).toBe(true);
  });

  it("isActivePlayer 메서드 - 현재 플레이어 확인", () => {
    gameManager = gameManager.addPlayer("user1").addPlayer("user2");
    expect(gameManager.isActivePlayer(gameManager.players[0].id)).toBe(true);
    expect(gameManager.isActivePlayer(gameManager.players[1].id)).toBe(false);

    gameManager = gameManager.runPlayer("135");
    expect(gameManager.isActivePlayer(gameManager.players[0].id)).toBe(false);
    expect(gameManager.isActivePlayer(gameManager.players[1].id)).toBe(true);
  });
});
