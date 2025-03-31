import BaseballGameManager from "./BaseballGameManager";
import BaseBallNumber from "./BaseBallNumber";

describe("BaseballGameManager", () => {
  let gameManager: BaseballGameManager;

  beforeEach(() => {
    gameManager = new BaseballGameManager({
      maxUserCount: 2,
      commonAnswer: new BaseBallNumber("123"),
    });
  });

  it("BaseballGameManager 생성 시 초기값 확인", () => {
    expect(gameManager.maxUserCount).toBe(2);
    expect(gameManager.baseballGames).toEqual([]);
    expect(gameManager.commonAnswer.numbers).toEqual([1, 2, 3]);
  });

  it("addBaseballGame 메서드 - 사용자 추가 시 baseballGames 배열 추가, 같은 정답을 공유", () => {
    gameManager = gameManager.addBaseballGame("user1");
    expect(gameManager.baseballGames.length).toBe(1);
    expect(gameManager.baseballGames[0].username).toBe("user1");
    expect(gameManager.baseballGames[0].answer.numbers).toEqual(
      gameManager.commonAnswer.numbers
    );
    gameManager = gameManager.addBaseballGame("user2");
    expect(gameManager.baseballGames.length).toBe(2);
    expect(gameManager.baseballGames[1].username).toBe("user2");
    expect(gameManager.baseballGames[1].answer.numbers).toEqual(
      gameManager.commonAnswer.numbers
    );
  });

  it("addBaseballGame 메서드 - 최대 사용자 수 초과 시 에러 발생", () => {
    gameManager = gameManager.addBaseballGame("user1");
    expect(() => gameManager.addBaseballGame("user2")).not.toThrow();
    expect(() =>
      gameManager.addBaseballGame("user2").addBaseballGame("user3")
    ).toThrow("최대 사용자 수를 초과했습니다.");
  });

  it("runGame 메서드 - 각 사용자마다 runGame 실행 시 각 history 누적", () => {
    gameManager = gameManager.addBaseballGame("user1").addBaseballGame("user2");
    gameManager = gameManager
      .runGame(gameManager.baseballGames[0].id, "123")
      .runGame(gameManager.baseballGames[1].id, "456");
    expect(gameManager.baseballGames[0].history).toEqual([
      { input: [1, 2, 3], strike: 3, ball: 0 },
    ]);
    expect(gameManager.baseballGames[1].history).toEqual([
      { input: [4, 5, 6], strike: 0, ball: 0 },
    ]);
    expect(gameManager.baseballGames[0].state).toBe("END");
    expect(gameManager.baseballGames[1].state).toBe("PLAYING");
  });

  it("isEnd 메서드 - 게임 종료 여부 확인", () => {
    expect(gameManager.isEnd()).toBe(false);
    gameManager = gameManager.addBaseballGame("user1");
    gameManager = gameManager.runGame(gameManager.baseballGames[0].id, "123");
    expect(gameManager.isEnd()).toBe(true);
  });

  it("isMaxUserCount 메서드 - 최대 사용자 수 초과 여부 확인", () => {
    expect(gameManager.isMaxUserCount()).toBe(false);
    gameManager = gameManager.addBaseballGame("user1");
    expect(gameManager.isMaxUserCount()).toBe(false);
    gameManager = gameManager.addBaseballGame("user2");
    expect(gameManager.isMaxUserCount()).toBe(true);
  });

  it("removeBaseballGame 메서드 - 게임 삭제 시 baseballGames 배열에서 제거", () => {
    gameManager = gameManager.addBaseballGame("user1").addBaseballGame("user2");
    expect(gameManager.baseballGames.length).toBe(2);
    gameManager = gameManager.removeBaseballGame(
      gameManager.baseballGames[0].id
    );
    expect(gameManager.baseballGames.length).toBe(1);
    expect(gameManager.baseballGames[0].username).toBe("user2");
  });

  it("reset 메서드 - 게임 초기화 확인", () => {
    gameManager = gameManager.addBaseballGame("user1").addBaseballGame("user2");
    gameManager = gameManager
      .runGame(gameManager.baseballGames[0].id, "123")
      .runGame(gameManager.baseballGames[1].id, "456");
    expect(gameManager.baseballGames[0].history.length).toBe(1);
    expect(gameManager.baseballGames[1].history.length).toBe(1);
    expect(gameManager.baseballGames[0].state).toBe("END");
    const resetGameManager = gameManager.reset();
    expect(resetGameManager.baseballGames[0].history.length).toBe(0);
    expect(resetGameManager.baseballGames[0].state).toBe("PLAYING");
    expect(resetGameManager.baseballGames[1].history.length).toBe(0);
  });

  it("isCurrentGame 메서드 - 현재 게임 확인", () => {
    gameManager = gameManager.addBaseballGame("user1").addBaseballGame("user2");
    expect(gameManager.isCurrentGame(gameManager.baseballGames[0].id)).toBe(
      true
    );
    expect(gameManager.isCurrentGame(gameManager.baseballGames[1].id)).toBe(
      false
    );

    gameManager = gameManager.runGame(gameManager.baseballGames[0].id, "135");
    expect(gameManager.isCurrentGame(gameManager.baseballGames[0].id)).toBe(
      false
    );
    expect(gameManager.isCurrentGame(gameManager.baseballGames[1].id)).toBe(
      true
    );
  });

  it("getNextIdx 메서드 - 다음 인덱스 확인", () => {
    expect(gameManager.getNextIdx(0, 2)).toBe(1);
    expect(gameManager.getNextIdx(1, 2)).toBe(0);
  });

  it("getPrevIdx 메서드 - 이전 인덱스 확인", () => {
    expect(gameManager.getPrevIdx(0, 2)).toBe(1);
    expect(gameManager.getPrevIdx(1, 2)).toBe(0);
  });

  it("getReconciledIdx 메서드 - 인덱스 조정 확인", () => {
    expect(gameManager.getReconciledIdx(0, 3, 5)).toBe(2);
    expect(gameManager.getReconciledIdx(3, 3, 5)).toBe(3);
    expect(gameManager.getReconciledIdx(4, 3, 5)).toBe(3);
  });
});
