import { atom } from "recoil";
import RandomBallCreator from "../domain/RandomBallCreator";
import BaseBallNumber from "../domain/BaseBallNumber";
import { BaseballGameManager } from "../domain/BaseballGameManager";

type State = {
  gameManager: BaseballGameManager;
};

export const BaseBallGameStore = atom<State>({
  key: "baseBallGame",
  default: {
    gameManager: new BaseballGameManager({
      answer: new BaseBallNumber(
        RandomBallCreator.createRandomBalls().join("")
      ),
    }),
  },
});
