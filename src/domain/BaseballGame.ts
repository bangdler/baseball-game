import BaseBallNumber, { TBaseBallNumber } from "./BaseBallNumber";
import RandomBallCreator from "./RandomBallCreator";

export interface IHistoryItem {
  input: TBaseBallNumber;
  strike: number;
  ball: number;
}

export interface ICountResult {
  strike: number;
  ball: number;
}

export type TProgress = "PLAYING" | "END";

export default class BaseballGame {
  id: string = new Date().getTime().toString() + Math.random().toString();
  username: string;
  answer: BaseBallNumber;
  history: IHistoryItem[];
  state: TProgress = "PLAYING";

  constructor({
    username,
    answer,
    history = [],
  }: {
    username: string;
    answer: BaseBallNumber;
    history?: IHistoryItem[];
  }) {
    this.username = username;
    this.answer = answer;
    this.history = history;
  }

  run(input: string): BaseballGame {
    const baseballNumber = new BaseBallNumber(input);
    const countResult = this.countBalls(baseballNumber);
    const newHistory = this.addHistory({
      input: baseballNumber.numbers,
      ...countResult,
    });
    const newBaseBallGame = new BaseballGame({
      username: this.username,
      answer: this.answer,
      history: newHistory,
    });
    newBaseBallGame.checkAnswer(baseballNumber);
    return newBaseBallGame;
  }

  countBalls(baseballNumber: BaseBallNumber): ICountResult {
    let strike = 0;
    let ball = 0;

    for (let i = 0; i < 3; i++) {
      if (baseballNumber.numbers[i] === this.answer.numbers[i]) {
        strike++;
      } else if (this.answer.numbers.includes(baseballNumber.numbers[i])) {
        ball++;
      }
    }

    return {
      strike,
      ball,
    };
  }

  checkAnswer(baseballNumber: BaseBallNumber) {
    if (this.answer.isEqual(baseballNumber)) {
      this.state = "END";
    }
  }

  isEnd() {
    return this.state === "END";
  }

  addHistory(historyItem: IHistoryItem): IHistoryItem[] {
    return [...this.history, historyItem];
  }

  reset(): BaseballGame {
    return new BaseballGame({
      username: this.username,
      answer: new BaseBallNumber(
        RandomBallCreator.createRandomBalls().join("")
      ),
    });
  }
}
