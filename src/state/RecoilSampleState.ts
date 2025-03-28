import { atom } from "recoil";
import BaseballGame from "../domain/BaseballGame";
import RandomBallCreator from "../domain/RandomBallCreator";
import BaseBallNumber from "../domain/BaseBallNumber";

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
