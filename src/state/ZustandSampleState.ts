import { create } from "zustand/react";
import BaseballGame from "../domain/BaseballGame";

interface State {
  game: BaseballGame;
}

interface Actions {}

export const sampleZustandStore = create<State & Actions>((set) => ({
  game: new BaseballGame(),
}));
