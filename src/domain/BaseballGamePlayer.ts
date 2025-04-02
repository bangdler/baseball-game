import BaseBallNumber from "./BaseBallNumber";


export class BaseballGamePlayer {
  id: string;
  name: string;
  history: BaseBallNumber[];

  constructor({
    id = new Date().getTime().toString() + Math.random().toString(),
    name,
    history = [],
  }: {
    id?: string;
    name: string;
    history?: BaseBallNumber[];
  }) {
    this.id = id;
    this.name = name;
    this.history = history;
  }

  addHistory(item: BaseBallNumber): BaseballGamePlayer {
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
