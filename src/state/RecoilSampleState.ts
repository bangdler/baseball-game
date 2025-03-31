import { atom } from "recoil";

import BaseballGameManager from "../domain/BaseballGameManager";

type State = {
  gameManager: BaseballGameManager;
};

export const BaseBallGameStore = atom<State>({
  key: "baseBallGame",
  default: {
    gameManager: new BaseballGameManager({
      maxUserCount: 3,
    }),
  },
});
