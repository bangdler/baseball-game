import { useRecoilState } from "recoil";
import { BaseBallGameStore } from "../state/RecoilSampleState";
import BaseBallNumber from "../domain/BaseBallNumber";
import BaseballGame from "../domain/BaseballGame";

export const useBaseballGame = () => {
  const [baseballState, setBaseballState] = useRecoilState(BaseBallGameStore);
  console.log(baseballState.game.answer);

  const checkAndAddHistory = (input: string) => {
    const baseballNumber = new BaseBallNumber(input);
    const game = baseballState.game;
    const checkResult = game.check(baseballNumber);

    setBaseballState((prev) => ({
      ...prev,
      history: [...prev.history, checkResult],
    }));
  };

  const resetGame = () => {
    const game = baseballState.game;

    setBaseballState((prev) => ({
      game: new BaseballGame(),
      history: [],
    }));
  };

  const lastInput = baseballState.history.at(-1);

  return {
    checkAndAddHistory,
    resetGame,
    history: baseballState.history,
    lastInput,
  };
};
