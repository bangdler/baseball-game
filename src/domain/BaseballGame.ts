import BaseBallNumber from "./BaseBallNumber";
import { BaseballGamePlayerManager } from "./BaseballGamePlayerManager";
import { BaseballGameController } from "./BaseballGameController";

export class BaseballGame {
  gameController: BaseballGameController;
  playerManager: BaseballGamePlayerManager;

  constructor({
    gameController,
    playerManager,
  }: {
    gameController: BaseballGameController;
    playerManager: BaseballGamePlayerManager;
  }) {
    this.gameController = gameController;
    this.playerManager = playerManager;
  }

  addPlayer(name: string): BaseballGame {
    const newPlayerManager = this.playerManager.add(name);
    const newGameController = this.gameController.updateCurPlayerCount(
      newPlayerManager.players.length
    );
    return new BaseballGame({
      gameController: newGameController,
      playerManager: newPlayerManager,
    });
  }

  runPlayer(input: string): BaseballGame {
    const newPlayerManager = this.playerManager.updateCurrentPlayer(
      new BaseBallNumber(input)
    );
    const newGameController = this.gameController.updateWinner(
      newPlayerManager.players
    );

    return new BaseballGame({
      gameController: newGameController,
      playerManager: newPlayerManager,
    });
  }

  removePlayer(id: string): BaseballGame {
    const newPlayerManager = this.playerManager.remove(id);
    const newGameController = this.gameController
      .updateCurPlayerCount(newPlayerManager.players.length)
      .updateWinner(newPlayerManager.players);

    return new BaseballGame({
      gameController: newGameController,
      playerManager: newPlayerManager,
    });
  }

  reset(): BaseballGame {
    return new BaseballGame({
      gameController: this.gameController.reset(),
      playerManager: this.playerManager.reset(),
    });
  }
}
