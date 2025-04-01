import { atom } from "recoil";
import RandomBallCreator from "../domain/RandomBallCreator";
import BaseBallNumber from "../domain/BaseBallNumber";
import { BaseballGame } from "../domain/BaseballGame";

type State = {
  game: BaseballGame;
};

export const BaseBallGameStore = atom<State>({
  key: "baseBallGame",
  default: {
    game: new BaseballGame({
      answer: new BaseBallNumber(
        RandomBallCreator.createRandomBalls().join("")
      ),
    }),
  },
});
