import { atom } from "recoil";
import RandomBallCreator from "../domain/RandomBallCreator";
import BaseBallNumber from "../domain/BaseBallNumber";
import { BaseballGame } from "../domain/BaseballGame";
import { BaseballGameController } from "../domain/BaseballGameController";
import { BaseballGamePlayerManager } from "../domain/BaseballGamePlayerManager";

type State = {
  game: BaseballGame;
};

export const BaseBallGameStore = atom<State>({
  key: "baseBallGame",
  default: {
    game: new BaseballGame({
      gameController: new BaseballGameController({
        answer: new BaseBallNumber(
          RandomBallCreator.createRandomBalls().join("")
        ),
      }),
      playerManager: new BaseballGamePlayerManager({
        players: [],
        activePlayerIdx: 0,
      }),
    }),
  },
});
