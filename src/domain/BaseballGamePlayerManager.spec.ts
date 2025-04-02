import { BaseballGamePlayer } from "./BaseballGamePlayer";
import { BaseballGamePlayerManager } from "./BaseballGamePlayerManager";
import BaseBallNumber from "./BaseBallNumber";
describe("BaseballGamePlayerManager", () => {
  let playerManager: BaseballGamePlayerManager;

  beforeEach(() => {
    playerManager = new BaseballGamePlayerManager({
      players: [
        new BaseballGamePlayer({ name: "user1" }),
        new BaseballGamePlayer({ name: "user2" }),
      ],
      activePlayerIdx: 0,
    });
  });

  it("생성 시 - 초기값 확인", () => {
    expect(playerManager.players.length).toBe(2);
    expect(playerManager.activePlayerIdx).toBe(0);
  });

  it("addPlayer 메서드 - 플레이어 추가 시 players 배열 추가", () => {
    playerManager = playerManager.add("user3").add("user4");
    expect(playerManager.players.length).toBe(4);
    expect(playerManager.players[2].name).toBe("user3");
    expect(playerManager.players[3].name).toBe("user4");
  });

  it("updatePlayer 메서드 - 실행 시 ActiveIdx에 해당하는 Player History 누적", () => {
    playerManager = playerManager.add("user1").add("user2");
    playerManager = playerManager
      .updateCurrentPlayer(new BaseBallNumber("123"))
      .updateCurrentPlayer(new BaseBallNumber("456"));
    expect(playerManager.players[0].history).toEqual([
      new BaseBallNumber("123"),
    ]);
    expect(playerManager.players[1].history).toEqual([
      new BaseBallNumber("456"),
    ]);
  });

  it("removePlayer 메서드 - 플레이어 삭제 시 players 배열에서 제거", () => {
    expect(playerManager.players.length).toBe(2);
    playerManager = playerManager.remove(playerManager.players[0].id);
    expect(playerManager.players.length).toBe(1);
    expect(playerManager.players[0].name).toBe("user2");
  });

  it("removePlayer 메서드 - 없는 플레이어 삭제 시 에러 반환", () => {
    expect(playerManager.players.length).toBe(2);
    expect(() => playerManager.remove("111")).toThrow(
      "존재하지 않는 플레이어입니다."
    );
  });

  it("reset 메서드 - 게임 초기화 확인", () => {
    playerManager = playerManager.add("user1").add("user2");
    playerManager = playerManager
      .updateCurrentPlayer(new BaseBallNumber("123"))
      .updateCurrentPlayer(new BaseBallNumber("456"));
    expect(playerManager.players[0].history.length).toBe(1);
    expect(playerManager.players[1].history.length).toBe(1);
    const resetGameManager = playerManager.reset();
    expect(resetGameManager.players[0].history.length).toBe(0);
    expect(resetGameManager.players[1].history.length).toBe(0);
  });

  it("isActivePlayer 메서드 - 현재 플레이어 확인", () => {
    playerManager = playerManager.add("user1").add("user2");
    const ids = playerManager.players.map((player) => player.id);
    expect(playerManager.isActivePlayer(ids[0])).toBe(true);
    expect(playerManager.isActivePlayer(ids[1])).toBe(false);

    playerManager = playerManager.updateCurrentPlayer(
      new BaseBallNumber("123")
    );
    expect(playerManager.isActivePlayer(ids[0])).toBe(false);
    expect(playerManager.isActivePlayer(ids[1])).toBe(true);

    playerManager = playerManager.remove(ids[0]).remove(ids[1]);
    expect(playerManager.isActivePlayer(ids[0])).toBe(false);
    expect(playerManager.isActivePlayer(ids[1])).toBe(false);
  });
});
