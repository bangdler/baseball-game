import { useRecoilState } from "recoil";
import { BaseBallGameStore } from "../state/RecoilSampleState";
import { BaseballGamePlayer } from "../domain/BaseballGamePlayer";

export const useBaseballGameManager = () => {
  const [baseballState, setBaseballState] = useRecoilState(BaseBallGameStore);
  console.log(...baseballState.gameManager.answer.numbers);

  const addPlayer = (username: string) => {
    setBaseballState({
      gameManager: baseballState.gameManager.addPlayer(username),
    });
  };

  const runPlayer = (input: string) => {
    setBaseballState({
      gameManager: baseballState.gameManager.runPlayer(input),
    });
  };

  const resetGame = () => {
    setBaseballState({
      gameManager: baseballState.gameManager.reset(),
    });
  };

  const removePlayer = (id: string) => {
    setBaseballState({
      gameManager: baseballState.gameManager.removePlayer(id),
    });
  };

  const isActivePlayer = (id: string) => {
    return baseballState.gameManager.isActivePlayer(id);
  };

  const isWinPlayer = (player: BaseballGamePlayer) => {
    return baseballState.gameManager.isWinPlayer(player);
  };

  return {
    addPlayer,
    removePlayer,
    runPlayer,
    resetGame,
    players: baseballState.gameManager.players,
    isEnd: baseballState.gameManager.isEnd(),
    isActivePlayer,
    isMaxPlayerCount: baseballState.gameManager.isMaxPlayerCount(),
    isWinPlayer,
  };
};
