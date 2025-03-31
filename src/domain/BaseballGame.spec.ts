import BaseballGame, { IHistoryItem } from "./BaseballGame";
import BaseBallNumber from "./BaseBallNumber";

describe("BaseballGame", () => {
  let game: BaseballGame;

  beforeEach(() => {
    game = new BaseballGame({
      username: "test",
      answer: new BaseBallNumber("123"),
    });
  });

  it("BaseballGame 생성 시 초기값 확인", () => {
    expect(game.answer).toBeInstanceOf(BaseBallNumber);
    expect(game.answer.numbers).toEqual([1, 2, 3]);
    expect(game.history).toEqual([]);
    expect(game.state).toEqual("PLAYING");
    expect(game.username).toEqual("test");
  });

  it("checkAnswer 메서드 - 정답일 경우 상태 변경", () => {
    game.checkAnswer(new BaseBallNumber("123"));
    expect(game.state).toBe("END");

    game = new BaseballGame({
      username: "test",
      answer: new BaseBallNumber("123"),
    });
    game.checkAnswer(new BaseBallNumber("124"));
    expect(game.state).toBe("PLAYING");
  });

  it("isEnd 메서드 - 게임 종료 여부 확인", () => {
    expect(game.isEnd()).toBe(false);
    game.checkAnswer(new BaseBallNumber("123"));
    expect(game.isEnd()).toBe(true);
  });

  it("addHistory 메서드 - 히스토리 추가 기능 확인. 원본 history를 건드리지 않고 새로운 history배열은 반환한다.", () => {
    const historyItem: IHistoryItem = {
      input: [1, 2, 3],
      strike: 3,
      ball: 0,
    };
    const newHistory = game.addHistory(historyItem);
    expect(newHistory).toEqual([{ input: [1, 2, 3], strike: 3, ball: 0 }]);
    expect(game.history).toEqual([]);
  });

  it("reset 메서드 - 초기화 확인", () => {
    const resetGame = game.run("456").run("123").reset();
    expect(resetGame).toBeInstanceOf(BaseballGame);
    expect(resetGame.history).toEqual([]);
    expect(resetGame.state).toBe("PLAYING");
  });

  const dummys = [
    {
      input: "456",
      result: { strike: 0, ball: 0 },
    },
    {
      input: "145",
      result: { strike: 1, ball: 0 },
    },
    {
      input: "715",
      result: { strike: 0, ball: 1 },
    },
    {
      input: "321",
      result: { strike: 1, ball: 2 },
    },
    {
      input: "312",
      result: { strike: 0, ball: 3 },
    },
    {
      input: "123",
      result: { strike: 3, ball: 0 },
    },
  ];

  it.each(dummys)(
    "countBalls 메서드 - 스트라이크, 볼 개수 확인. input: $input",
    (dummy) => {
      const baseballNumber = new BaseBallNumber(dummy.input);
      const result = game.countBalls(baseballNumber);
      expect(result).toEqual(dummy.result);
    }
  );

  let currentGame: BaseballGame | undefined;
  it.each(dummys)(
    "run 메서드 - 새 게임 인스턴스 반환 및 상태 변화 확인. input: $input",
    (dummy) => {
      if (currentGame === undefined) {
        currentGame = game;
      }
      currentGame = currentGame.run(dummy.input);
      expect(currentGame).toBeInstanceOf(BaseballGame);
      expect(currentGame.history).toHaveLength(dummys.indexOf(dummy) + 1);
      expect(currentGame.history.at(-1)).toEqual({
        input: dummy.input.split("").map(Number),
        ...dummy.result,
      });

      if (dummy.result.strike === 3) {
        expect(currentGame.state).toBe("END");
        expect(currentGame.isEnd()).toBe(true);
      } else {
        expect(currentGame.state).toBe("PLAYING");
        expect(currentGame.isEnd()).toBe(false);
      }
    }
  );
});
