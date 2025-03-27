import BaseBallNumber, { TBaseBallNumber } from "./BaseBallNumber";
import RandomBallCreator from "./RandomBallCreator";

export interface ICheckResult {
  input: TBaseBallNumber;
  strike: number;
  ball: number;
  isAnswer: boolean;
}

export default class BaseballGame {
  answer: number[];

  constructor() {
    this.answer = RandomBallCreator.createRandomBalls();
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
      input: baseballNumber.numbers,
      strike,
      ball,
      isAnswer: strike === 3,
    };
  }
}
