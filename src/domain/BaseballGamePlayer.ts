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
    id = new Date().getTime().toString() + Math.random().toString(),
    name,
    history = [],
  }: {
    id?: string;
    name: string;
    history?: IHistoryItem[];
  }) {
    this.id = id;
    this.name = name;
    this.history = history;
  }

  addHistory(item: IHistoryItem): BaseballGamePlayer {
    return new BaseballGamePlayer({
      id: this.id,
      name: this.name,
      history: [...this.history, item],
    });
  }

  resetHistory(): BaseballGamePlayer {
    return new BaseballGamePlayer({ id: this.id, name: this.name });
  }
}
