import { TurnManagementUtils } from "../utils/TurnManagementUtils";
import { BaseballGamePlayer, IHistoryItem } from "./BaseballGamePlayer";

export class BaseballGamePlayerManager {
  players: BaseballGamePlayer[];
  activePlayerIdx: number;

  constructor({
    players,
    activePlayerIdx,
  }: {
    players: BaseballGamePlayer[];
    activePlayerIdx: number;
  }) {
    this.players = players;
    this.activePlayerIdx = activePlayerIdx;
  }

  getCurrentPlayer(): BaseballGamePlayer {
    return this.players[this.activePlayerIdx];
  }

  add(name: string): BaseballGamePlayerManager {
    return new BaseballGamePlayerManager({
      players: [...this.players, new BaseballGamePlayer({ name })],
      activePlayerIdx: this.activePlayerIdx,
    });
  }

  updateCurrentPlayer(history: IHistoryItem): BaseballGamePlayerManager {
    const currentPlayer = this.players[this.activePlayerIdx];
    const newPlayer = currentPlayer.addHistory(history);
    const newPlayers = [...this.players];
    newPlayers[this.activePlayerIdx] = newPlayer;

    const newActivePlayerIdx = TurnManagementUtils.getNextIdx(
      this.activePlayerIdx,
      this.players.length
    );

    return new BaseballGamePlayerManager({
      players: newPlayers,
      activePlayerIdx: newActivePlayerIdx,
    });
  }

  remove(id: string): BaseballGamePlayerManager {
    const removeIdx = this.players.findIndex((player) => player.id === id);
    if (removeIdx === -1) {
      throw new Error("존재하지 않는 플레이어입니다.");
    }
    const newPlayers = [...this.players].filter((_, idx) => idx !== removeIdx);
    const reconciledIdx = TurnManagementUtils.getReconciledIdx(
      removeIdx,
      this.activePlayerIdx,
      this.players.length
    );

    return new BaseballGamePlayerManager({
      players: newPlayers,
      activePlayerIdx: reconciledIdx,
    });
  }

  reset(): BaseballGamePlayerManager {
    return new BaseballGamePlayerManager({
      players: this.players.map((player) => player.resetHistory()),
      activePlayerIdx: 0,
    });
  }

  isActivePlayer(id: string): boolean {
    return this.getCurrentPlayer().id === id;
  }
}
