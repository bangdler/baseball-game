import { BaseballGamePlayer, IHistoryItem } from "../domain/BaseballGamePlayer";

export class BaseballGameUtils {
  static historyToResultString(history: IHistoryItem) {
    const { baseballNumber, strike, ball } = history;

    const inputString = baseballNumber.numbers.join("");
    let resultString;

    if (strike === 3) {
      resultString = `${inputString} : 정답입니다!`;
    } else if (strike === 0 && ball === 0) {
      resultString = `${inputString} : 낫싱`;
    } else {
      resultString = `${inputString} : ${strike} 스트라이크 ${ball} 볼`;
    }

    return resultString;
  }

  static playerListToInfoString(players: BaseballGamePlayer[]) {
    if (players.length === 0) {
      return "참여중인 사용자가 없습니다.";
    }
    let info = "참여중인 사용자 목록:\n";
    players.forEach((player, idx) => {
      if (idx === players.length - 1) {
        info += `${player.name}`;
      } else {
        info += `${player.name}, `;
      }
    });
    return info;
  }
}
