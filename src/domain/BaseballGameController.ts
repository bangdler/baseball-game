import { BaseballGamePlayer } from "./BaseballGamePlayer";
import BaseBallNumber from "./BaseBallNumber";
import RandomBallCreator from "./RandomBallCreator";

export class BaseballGameController {
  maxPlayerCount: number = 3;
  answer: BaseBallNumber;
  winner: BaseballGamePlayer | null;

  constructor({
    answer,
    winner = null,
  }: {
    answer: BaseBallNumber;
    winner?: BaseballGamePlayer | null;
  }) {
    this.answer = answer;
    this.winner = winner;
  }

  checkRule(playerCount: number) {
    if (playerCount > this.maxPlayerCount) {
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

  reset(): BaseballGameController {
    return new BaseballGameController({
      answer: new BaseBallNumber(
        RandomBallCreator.createRandomBalls().join("")
      ),
    });
  }

  isMaxPlayerCount(playerCount: number): boolean {
    return playerCount >= this.maxPlayerCount;
  }

  isEnd(): boolean {
    return !!this.winner;
  }

  isWinPlayer(player: BaseballGamePlayer): boolean {
    return !!this.winner && this.winner.id === player.id;
  }
}
