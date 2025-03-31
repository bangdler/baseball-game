import BaseballGame from "./BaseballGame";
import BaseBallNumber from "./BaseBallNumber";
import RandomBallCreator from "./RandomBallCreator";

export default class BaseballGameManager {
  maxUserCount: number;
  baseballGames: BaseballGame[];
  commonAnswer: BaseBallNumber;
  currentGameIdx: number;

  constructor({
    maxUserCount,
    baseballGames = [],
    commonAnswer = new BaseBallNumber(
      RandomBallCreator.createRandomBalls().join("")
    ),
    currentGameIdx = 0,
  }: {
    maxUserCount: number;
    baseballGames?: BaseballGame[];
    commonAnswer?: BaseBallNumber;
    currentGameIdx?: number;
  }) {
    this.maxUserCount = maxUserCount;
    this.baseballGames = baseballGames;
    this.commonAnswer = commonAnswer;
    this.currentGameIdx = currentGameIdx;
  }

  addBaseballGame(username: string): BaseballGameManager {
    if (this.isMaxUserCount()) {
      throw new Error("최대 사용자 수를 초과했습니다.");
    }

    const baseballGame = new BaseballGame({
      username,
      answer: this.commonAnswer,
    });
    const newBaseBallGames = [...this.baseballGames, baseballGame];

    return new BaseballGameManager({
      maxUserCount: this.maxUserCount,
      baseballGames: newBaseBallGames,
      commonAnswer: this.commonAnswer,
      currentGameIdx: this.currentGameIdx,
    });
  }

  runGame(id: string, input: string): BaseballGameManager {
    const baseballGame = this.baseballGames.find((game) => game.id === id);
    if (!baseballGame) {
      throw new Error("게임을 찾을 수 없습니다.");
    }

    const newBaseBallGame = baseballGame.run(input);
    const newBaseballGames = this.baseballGames.map((game) =>
      game.id === id ? newBaseBallGame : game
    );
    const nextGameIdx = this.getNextIdx(
      this.currentGameIdx,
      newBaseballGames.length
    );

    return new BaseballGameManager({
      maxUserCount: this.maxUserCount,
      baseballGames: newBaseballGames,
      commonAnswer: this.commonAnswer,
      currentGameIdx: nextGameIdx,
    });
  }

  isEnd(): boolean {
    return this.baseballGames.some((game) => game.isEnd());
  }

  isMaxUserCount(): boolean {
    return this.baseballGames.length >= this.maxUserCount;
  }

  reset(): BaseballGameManager {
    const newCommonAnswer = new BaseBallNumber(
      RandomBallCreator.createRandomBalls().join("")
    );
    const newBaseballGames = this.baseballGames.map((game) => {
      return new BaseballGame({
        username: game.username,
        answer: newCommonAnswer,
      });
    });

    return new BaseballGameManager({
      maxUserCount: this.maxUserCount,
      baseballGames: newBaseballGames,
      commonAnswer: newCommonAnswer,
    });
  }

  removeBaseballGame(id: string): BaseballGameManager {
    const removeIdx = this.baseballGames.findIndex((game) => game.id === id);
    let reconciledIdx = this.currentGameIdx;
    if (removeIdx !== -1) {
      reconciledIdx = this.getReconciledIdx(
        removeIdx,
        this.currentGameIdx,
        this.baseballGames.length
      );
    }

    const newBaseballGames = [...this.baseballGames].filter(
      (game) => game.id !== id
    );

    return new BaseballGameManager({
      maxUserCount: this.maxUserCount,
      baseballGames: newBaseballGames,
      commonAnswer: this.commonAnswer,
      currentGameIdx: reconciledIdx,
    });
  }

  isCurrentGame(id: string): boolean {
    const gameIdx = this.baseballGames.findIndex((game) => game.id === id);
    if (gameIdx === -1) {
      throw new Error("게임을 찾을 수 없습니다.");
    }
    return gameIdx === this.currentGameIdx;
  }

  getNextIdx(curIdx: number, length: number): number {
    const nextIdx = curIdx + 1;
    if (nextIdx >= length) {
      return 0;
    }
    return nextIdx;
  }

  getPrevIdx(curIdx: number, length: number): number {
    const prevIdx = curIdx - 1;
    if (prevIdx < 0) {
      return length - 1;
    }
    return prevIdx;
  }

  getReconciledIdx(removeIdx: number, curIdx: number, length: number): number {
    let reconciledIdx = curIdx;
    if (removeIdx < curIdx) {
      reconciledIdx = this.getPrevIdx(curIdx, length);
    }
    return reconciledIdx;
  }
}
