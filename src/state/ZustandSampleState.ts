import { create } from "zustand/react";
import { BaseballGame } from "../domain/BaseballGame";
import BaseBallNumber from "../domain/BaseBallNumber";
import RandomBallCreator from "../domain/RandomBallCreator";
import { BaseballGameController } from "../domain/BaseballGameController";
import { BaseballGamePlayerManager } from "../domain/BaseballGamePlayerManager";

interface State {
  game: BaseballGame;
}

interface Actions {
  setGame: ({ game }: { game: BaseballGame }) => void;
}

export const sampleZustandStore = create<State & Actions>((set) => ({
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
  setGame: ({ game }: { game: BaseballGame }) => set({ game }),
}));
