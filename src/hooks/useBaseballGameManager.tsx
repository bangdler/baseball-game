import { useRecoilState } from "recoil";
import { BaseBallGameStore } from "../state/RecoilSampleState";
import { BaseballGamePlayer } from "../domain/BaseballGamePlayer";

export const useBaseballGameManager = () => {
  const [baseballState, setBaseballState] = useRecoilState(BaseBallGameStore);
  console.log(...baseballState.game.answer.numbers);

  const addPlayer = (username: string) => {
    setBaseballState({
      game: baseballState.game.addPlayer(username),
    });
  };

  const runPlayer = (input: string) => {
    setBaseballState({
      game: baseballState.game.runPlayer(input),
    });
  };

  const resetGame = () => {
    setBaseballState({
      game: baseballState.game.reset(),
    });
  };

  const removePlayer = (id: string) => {
    setBaseballState({
      game: baseballState.game.removePlayer(id),
    });
  };

  const isActivePlayer = (id: string) => {
    return baseballState.game.playerManager.isActivePlayer(id);
  };

  const isWinPlayer = (player: BaseballGamePlayer) => {
    return baseballState.game.isWinPlayer(player);
  };

  return {
    addPlayer,
    removePlayer,
    runPlayer,
    resetGame,
    players: baseballState.game.playerManager.players,
    isEnd: baseballState.game.isEnd(),
    isActivePlayer,
    isMaxPlayerCount: baseballState.game.isMaxPlayerCount(),
    isWinPlayer,
  };
};
