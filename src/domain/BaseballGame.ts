import { BaseballGamePlayer } from "./BaseballGamePlayer";
import BaseBallNumber from "./BaseBallNumber";
import RandomBallCreator from "./RandomBallCreator";
import { BaseballGamePlayerManager } from "./BaseballGamePlayerManager";

export class BaseballGame {
  maxPlayerCount: number;
  playerManager: BaseballGamePlayerManager;
  answer: BaseBallNumber;
  winner: BaseballGamePlayer | null;

  constructor({
    answer,
    maxPlayerCount = 3,
    playerManager = new BaseballGamePlayerManager({
      players: [],
      activePlayerIdx: 0,
    }),
    winner = null,
  }: {
    answer: BaseBallNumber;
    maxPlayerCount?: number;
    playerManager?: BaseballGamePlayerManager;
    winner?: BaseballGamePlayer | null;
  }) {
    this.validate(answer, maxPlayerCount, playerManager.players.length);

    this.answer = answer;
    this.maxPlayerCount = maxPlayerCount;
    this.playerManager = playerManager;
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

  addPlayer(name: string): BaseballGame {
    if (this.isMaxPlayerCount()) {
      throw new Error("최대 플레이어 수를 초과했습니다.");
    }
    const newPlayerManager = this.playerManager.addPlayer(name);

    return new BaseballGame({
      answer: this.answer,
      maxPlayerCount: this.maxPlayerCount,
      playerManager: newPlayerManager,
      winner: this.winner,
    });
  }

  runPlayer(input: string): BaseballGame {
    const baseballNumber = new BaseBallNumber(input);
    const { strike, ball } = this.answer.compareTo(baseballNumber);
    const newPlayerManager = this.playerManager.updatePlayer({
      baseballNumber,
      strike,
      ball,
    });

    const currentPlayer = this.playerManager.getCurrentPlayer();
    const newWinner = this.answer.isEqual(baseballNumber)
      ? currentPlayer
      : null;

    return new BaseballGame({
      answer: this.answer,
      maxPlayerCount: this.maxPlayerCount,
      playerManager: newPlayerManager,
      winner: newWinner,
    });
  }

  removePlayer(id: string): BaseballGame {
    const newPlayerManager = this.playerManager.removePlayer(id);
    const newWinner = this.winner && this.winner.id === id ? null : this.winner;

    return new BaseballGame({
      answer: this.answer,
      maxPlayerCount: this.maxPlayerCount,
      playerManager: newPlayerManager,
      winner: newWinner,
    });
  }

  reset(): BaseballGame {
    return new BaseballGame({
      answer: new BaseBallNumber(
        RandomBallCreator.createRandomBalls().join("")
      ),
      maxPlayerCount: this.maxPlayerCount,
      playerManager: this.playerManager.reset(),
      winner: null,
    });
  }

  isMaxPlayerCount(): boolean {
    return this.playerManager.players.length >= this.maxPlayerCount;
  }

  isEnd(): boolean {
    return !!this.winner;
  }

  isWinPlayer(player: BaseballGamePlayer): boolean {
    const lastHistory = player.history.at(-1);
    return !!lastHistory && this.answer.isEqual(lastHistory.baseballNumber);
  }
}
