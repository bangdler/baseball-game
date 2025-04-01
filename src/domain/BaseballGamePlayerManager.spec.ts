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
    playerManager = playerManager.addPlayer("user3").addPlayer("user4");
    expect(playerManager.players.length).toBe(4);
    expect(playerManager.players[2].name).toBe("user3");
    expect(playerManager.players[3].name).toBe("user4");
  });

  it("updatePlayer 메서드 - 실행 시 ActiveIdx에 해당하는 Player History 누적", () => {
    playerManager = playerManager.addPlayer("user1").addPlayer("user2");
    playerManager = playerManager
      .updatePlayer({
        baseballNumber: new BaseBallNumber("123"),
        strike: 3,
        ball: 0,
      })
      .updatePlayer({
        baseballNumber: new BaseBallNumber("456"),
        strike: 0,
        ball: 0,
      });
    expect(playerManager.players[0].history).toEqual([
      { baseballNumber: new BaseBallNumber("123"), strike: 3, ball: 0 },
    ]);
    expect(playerManager.players[1].history).toEqual([
      { baseballNumber: new BaseBallNumber("456"), strike: 0, ball: 0 },
    ]);
  });

  it("removePlayer 메서드 - 플레이어 삭제 시 players 배열에서 제거", () => {
    expect(playerManager.players.length).toBe(2);
    playerManager = playerManager.removePlayer(playerManager.players[0].id);
    expect(playerManager.players.length).toBe(1);
    expect(playerManager.players[0].name).toBe("user2");
  });

  it("removePlayer 메서드 - 없는 플레이어 삭제 시 에러 반환", () => {
    expect(playerManager.players.length).toBe(2);
    expect(() => playerManager.removePlayer("111")).toThrow(
      "존재하지 않는 플레이어입니다."
    );
  });

  it("reset 메서드 - 게임 초기화 확인", () => {
    playerManager = playerManager.addPlayer("user1").addPlayer("user2");
    playerManager = playerManager
      .updatePlayer({
        baseballNumber: new BaseBallNumber("123"),
        strike: 3,
        ball: 0,
      })
      .updatePlayer({
        baseballNumber: new BaseBallNumber("456"),
        strike: 0,
        ball: 0,
      });
    expect(playerManager.players[0].history.length).toBe(1);
    expect(playerManager.players[1].history.length).toBe(1);
    const resetGameManager = playerManager.reset();
    expect(resetGameManager.players[0].history.length).toBe(0);
    expect(resetGameManager.players[1].history.length).toBe(0);
  });

  it("isActivePlayer 메서드 - 현재 플레이어 확인", () => {
    playerManager = playerManager.addPlayer("user1").addPlayer("user2");
    expect(playerManager.isActivePlayer(playerManager.players[0].id)).toBe(
      true
    );
    expect(playerManager.isActivePlayer(playerManager.players[1].id)).toBe(
      false
    );

    playerManager = playerManager.updatePlayer({
      baseballNumber: new BaseBallNumber("123"),
      strike: 3,
      ball: 0,
    });
    expect(playerManager.isActivePlayer(playerManager.players[0].id)).toBe(
      false
    );
    expect(playerManager.isActivePlayer(playerManager.players[1].id)).toBe(
      true
    );
  });
});
