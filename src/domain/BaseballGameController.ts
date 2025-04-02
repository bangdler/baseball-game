import { BaseballGamePlayer } from "./BaseballGamePlayer";
import BaseBallNumber from "./BaseBallNumber";
import RandomBallCreator from "./RandomBallCreator";

export class BaseballGameController {
  maxPlayerCount: number = 3;
  curPlayerCount: number;
  answer: BaseBallNumber;
  winner: BaseballGamePlayer | null;

  constructor({
    answer,
    winner = null,
    curPlayerCount = 0,
  }: {
    answer: BaseBallNumber;
    winner?: BaseballGamePlayer | null;
    curPlayerCount?: number;
  }) {
    this.answer = answer;
    this.winner = winner;
    this.curPlayerCount = curPlayerCount;
    this.checkRule();
  }

  checkRule() {
    if (this.curPlayerCount > this.maxPlayerCount) {
      throw new Error("최대 플레이어 수를 초과했습니다.");
    }
  }

  updateWinner(players: BaseballGamePlayer[]): BaseballGameController {
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      const lastBaseballNumber = player.history.at(-1);
      if (lastBaseballNumber && this.answer.isEqual(lastBaseballNumber)) {
        return new BaseballGameController({
          answer: this.answer,
          winner: player,
        });
      }
    }
    return new BaseballGameController({ answer: this.answer });
  }

  updateCurPlayerCount(count: number): BaseballGameController {
    return new BaseballGameController({
      answer: this.answer,
      curPlayerCount: count,
    });
  }

  reset(): BaseballGameController {
    return new BaseballGameController({
      answer: new BaseBallNumber(
        RandomBallCreator.createRandomBalls().join("")
      ),
    });
  }

  isMaxPlayerCount(): boolean {
    return this.curPlayerCount >= this.maxPlayerCount;
  }

  isEnd(): boolean {
    return !!this.winner;
  }

  isWinPlayer(player: BaseballGamePlayer): boolean {
    return !!this.winner && this.winner.id === player.id;
  }
}
