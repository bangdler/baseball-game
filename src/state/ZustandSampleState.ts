import { create } from "zustand/react";
import { BaseballGame } from "../domain/BaseballGame";
import BaseBallNumber from "../domain/BaseBallNumber";
import RandomBallCreator from "../domain/RandomBallCreator";

interface State {
  game: BaseballGame;
}
  
interface Actions {}

export const sampleZustandStore = create<State & Actions>((set) => ({
  game: new BaseballGame({
    answer: new BaseBallNumber(RandomBallCreator.createRandomBalls().join("")),
  }),
}));
