import { BaseballGamePlayer } from "./BaseballGamePlayer";
import BaseBallNumber from "./BaseBallNumber";
import RandomBallCreator from "./RandomBallCreator";
import { TurnManagementUtils } from "../utils/TurnManagementUtils";

export class BaseballGameManager {
  maxPlayerCount: number;
  players: BaseballGamePlayer[];
  answer: BaseBallNumber;
  activePlayerIdx: number;
  winner: BaseballGamePlayer | null;

  constructor({
    answer,
    maxPlayerCount = 3,
    players = [],
    activePlayerIdx = 0,
    winner = null,
  }: {
    answer: BaseBallNumber;
    maxPlayerCount?: number;
    activePlayerIdx?: number;
    players?: BaseballGamePlayer[];
    winner?: BaseballGamePlayer | null;
  }) {
    this.validate(answer, maxPlayerCount, players.length);

    this.answer = answer;
    this.maxPlayerCount = maxPlayerCount;
    this.players = players;
    this.activePlayerIdx = activePlayerIdx;
    this.winner = winner;
  }

  validate(
    answer: BaseBallNumber,
    maxPlayerCount: number,
    playerCount: number
  ) {
    if (!(answer instanceof BaseBallNumber)) {
      throw new Error("정답이 BaseballNumber 인스턴스가 아닙니다.");
    }
    if (maxPlayerCount <= 0) {
      throw new Error("최대 플레이어수는 0 이하일 수 업습니다.");
    }
    if (playerCount > maxPlayerCount) {
      throw new Error("최대 플레이어 수를 초과했습니다.");
    }
  }

  addPlayer(username: string): BaseballGameManager {
    const player = new BaseballGamePlayer({ name: username });

    return new BaseballGameManager({
      answer: this.answer,
      maxPlayerCount: this.maxPlayerCount,
      players: [...this.players, player],
      activePlayerIdx: this.activePlayerIdx,
      winner: this.winner,
    });
  }

  runPlayer(input: string): BaseballGameManager {
    const baseballNumber = new BaseBallNumber(input);
    const currentPlayer = this.players[this.activePlayerIdx];
    const countResult = this.answer.compareTo(baseballNumber);
    const newPlayer = currentPlayer.addHistory({
      baseballNumber,
      ...countResult,
    });
    const newPlayers = [...this.players];
    newPlayers[this.activePlayerIdx] = newPlayer;

    const newWinner = this.answer.isEqual(baseballNumber)
      ? currentPlayer
      : null;

    const newActivePlayerIdx = TurnManagementUtils.getNextIdx(
      this.activePlayerIdx,
      this.players.length
    );

    return new BaseballGameManager({
      answer: this.answer,
      maxPlayerCount: this.maxPlayerCount,
      players: newPlayers,
      activePlayerIdx: newActivePlayerIdx,
      winner: newWinner,
    });
  }

  removePlayer(playerId: string): BaseballGameManager {
    const removeIdx = this.players.findIndex(
      (player) => player.id === playerId
    );
    if (removeIdx === -1) {
      throw new Error("존재하지 않는 플레이어입니다.");
    }
    const newPlayers = [...this.players].filter((_, idx) => idx !== removeIdx);
    const reconciledIdx = TurnManagementUtils.getReconciledIdx(
      removeIdx,
      this.activePlayerIdx,
      this.players.length
    );
    const newWinner =
      this.winner && this.winner.id === playerId ? null : this.winner;

    return new BaseballGameManager({
      answer: this.answer,
      maxPlayerCount: this.maxPlayerCount,
      players: newPlayers,
      activePlayerIdx: reconciledIdx,
      winner: newWinner,
    });
  }

  reset(): BaseballGameManager {
    return new BaseballGameManager({
      answer: new BaseBallNumber(
        RandomBallCreator.createRandomBalls().join("")
      ),
      maxPlayerCount: this.maxPlayerCount,
      players: this.players.map((player) => player.resetHistory()),
    });
  }

  isMaxPlayerCount(): boolean {
    return this.players.length >= this.maxPlayerCount;
  }

  isActivePlayer(id: string): boolean {
    return (
      this.activePlayerIdx ===
      this.players.findIndex((player) => player.id === id)
    );
  }

  isEnd(): boolean {
    return !!this.winner;
  }

  isWinPlayer(player: BaseballGamePlayer): boolean {
    const lastHistory = player.history.at(-1);
    return !!lastHistory && this.answer.isEqual(lastHistory.baseballNumber);
  }
}
