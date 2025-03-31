import { useRecoilState } from "recoil";
import { BaseBallGameStore } from "../state/RecoilSampleState";

export const useBaseballGameManager = () => {
  const [baseballState, setBaseballState] = useRecoilState(BaseBallGameStore);
  console.log(...baseballState.gameManager.commonAnswer.numbers);

  const addBaseballGame = (username: string) => {
    setBaseballState({
      gameManager: baseballState.gameManager.addBaseballGame(username),
    });
  };

  const checkAndAddHistory = (id: string, input: string) => {
    setBaseballState({
      gameManager: baseballState.gameManager.runGame(id, input),
    });
  };

  const resetGame = () => {
    setBaseballState({
      gameManager: baseballState.gameManager.reset(),
    });
  };

  const removeBaseballGame = (id: string) => {
    setBaseballState({
      gameManager: baseballState.gameManager.removeBaseballGame(id),
    });
  };

  const isCurrentGame = (id: string) => {
    return baseballState.gameManager.isCurrentGame(id);
  };

  return {
    addBaseballGame,
    removeBaseballGame,
    checkAndAddHistory,
    resetGame,
    baseballGames: baseballState.gameManager.baseballGames,
    isEnd: baseballState.gameManager.isEnd(),
    isMaxUserCount: baseballState.gameManager.isMaxUserCount(),
    isCurrentGame,
  };
};
