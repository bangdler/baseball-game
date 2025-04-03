import { useRecoilState } from "recoil";
import { BaseBallGameStore } from "../state/RecoilSampleState";
import { BaseballGamePlayer } from "../domain/BaseballGamePlayer";
import { sampleZustandStore } from "../state/ZustandSampleState";

export const useBaseballGameManager = () => {
  const { game, setGame } = sampleZustandStore();
  console.log(...game.gameController.answer.numbers);

  const addPlayer = (username: string) => {
    setGame({
      game: game.addPlayer(username),
    });
  };

  const runPlayer = (input: string) => {
    setGame({
      game: game.runPlayer(input),
    });
  };

  const resetGame = () => {
    setGame({
      game: game.reset(),
    });
  };

  const removePlayer = (id: string) => {
    setGame({
      game: game.removePlayer(id),
    });
  };

  const isActivePlayer = (id: string) => {
    return game.playerManager.isActivePlayer(id);
  };

  const isWinPlayer = (player: BaseballGamePlayer) => {
    return game.gameController.isWinPlayer(player);
  };

  return {
    answer: game.gameController.answer,
    addPlayer,
    removePlayer,
    runPlayer,
    resetGame,
    players: game.playerManager.players,
    isEnd: game.gameController.isEnd(),
    isActivePlayer,
    isMaxPlayerCount: game.gameController.isMaxPlayerCount(),
    isWinPlayer,
  };
};
