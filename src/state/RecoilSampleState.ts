import { atom } from "recoil";
import BaseballGame from "../domain/BaseballGame";

type State = {
  game: BaseballGame;
};

export const BaseBallGameStore = atom<State>({
  key: "baseBallGame",
  default: { game: new BaseballGame({}) },
});
