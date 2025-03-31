import BaseballGame from "./BaseballGame";
import BaseBallNumber from "./BaseBallNumber";
import RandomBallCreator from "./RandomBallCreator";

export default class BaseballGameManager {
  maxUserCount: number;
  baseballGames: BaseballGame[];
  commonAnswer: BaseBallNumber;

  constructor({
    maxUserCount,
    baseballGames = [],
    commonAnswer = new BaseBallNumber(
      RandomBallCreator.createRandomBalls().join("")
    ),
  }: {
    maxUserCount: number;
    baseballGames?: BaseballGame[];
    commonAnswer?: BaseBallNumber;
  }) {
    this.maxUserCount = maxUserCount;
    this.baseballGames = baseballGames;
    this.commonAnswer = commonAnswer;
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
    });
  }

  runGame(id: string, input: string) {
    const baseballGame = this.baseballGames.find((game) => game.id === id);
    if (!baseballGame) {
      throw new Error("게임을 찾을 수 없습니다.");
    }

    const newBaseBallGame = baseballGame.run(input);
    const newBaseballGames = this.baseballGames.map((game) =>
      game.id === id ? newBaseBallGame : game
    );

    return new BaseballGameManager({
      maxUserCount: this.maxUserCount,
      baseballGames: newBaseballGames,
      commonAnswer: this.commonAnswer,
    });
  }

  isEnd() {
    return this.baseballGames.some((game) => game.isEnd());
  }

  isMaxUserCount() {
    return this.baseballGames.length >= this.maxUserCount;
  }

  reset() {
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

  removeBaseballGame(id: string) {
    const newBaseballGames = [...this.baseballGames].filter(
      (game) => game.id !== id
    );

    return new BaseballGameManager({
      maxUserCount: this.maxUserCount,
      baseballGames: newBaseballGames,
      commonAnswer: this.commonAnswer,
    });
  }
}
