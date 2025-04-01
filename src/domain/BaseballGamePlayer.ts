import BaseBallNumber from "./BaseBallNumber";

export interface IHistoryItem {
  baseballNumber: BaseBallNumber;
  strike: number;
  ball: number;
}

export class BaseballGamePlayer {
  id: string;
  name: string;
  history: IHistoryItem[];

  constructor({
    name,
    history = [],
  }: {
    name: string;
    history?: IHistoryItem[];
  }) {
    this.id = new Date().getTime().toString() + Math.random().toString();
    this.name = name;
    this.history = history;
  }

  addHistory(item: IHistoryItem): BaseballGamePlayer {
    return new BaseballGamePlayer({
      name: this.name,
      history: [...this.history, item],
    });
  }

  resetHistory(): BaseballGamePlayer {
    return new BaseballGamePlayer({ name: this.name });
  }
}
