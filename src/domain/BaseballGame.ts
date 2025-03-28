import BaseBallNumber, { TBaseBallNumber } from "./BaseBallNumber";
import RandomBallCreator from "./RandomBallCreator";

export interface IHistoryItem {
  input: TBaseBallNumber;
  strike: number;
  ball: number;
  isAnswer: boolean;
}

export interface ICheckResult {
  strike: number;
  ball: number;
  isAnswer: boolean;
}

export default class BaseballGame {
  answer: TBaseBallNumber;
  history: IHistoryItem[];

  constructor({
    answer = RandomBallCreator.createRandomBalls(),
    history = [],
  }: {
    answer?: TBaseBallNumber;
    history?: IHistoryItem[];
  }) {
    this.answer = answer;
    this.history = history;
  }

  run(input: string) {
    const baseballNumber = new BaseBallNumber(input);
    const checkResult = this.check(baseballNumber);
    const newHistory = this.addHistory({
      input: baseballNumber.numbers,
      ...checkResult,
    });

    return new BaseballGame({
      answer: this.answer,
      history: newHistory,
    });
  }

  check(baseballNumber: BaseBallNumber): ICheckResult {
    let strike = 0;
    let ball = 0;

    for (let i = 0; i < 3; i++) {
      if (baseballNumber.numbers[i] === this.answer[i]) {
        strike++;
      } else if (this.answer.includes(baseballNumber.numbers[i])) {
        ball++;
      }
    }

    return {
      strike,
      ball,
      isAnswer: strike === 3,
    };
  }

  addHistory(historyItem: IHistoryItem) {
    return [...this.history, historyItem];
  }

  reset() {
    return new BaseballGame({});
  }
}
