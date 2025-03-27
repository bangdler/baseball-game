import { atom } from "recoil";
import BaseballGame, { ICheckResult } from "../domain/BaseballGame";

type State = {
  game: BaseballGame;
  history: ICheckResult[];
};

export const BaseBallGameStore = atom<State>({
  key: "baseBallGame",
  default: { game: new BaseballGame(), history: [] },
});
