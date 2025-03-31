import BaseballGame, { IHistoryItem } from "./../domain/BaseballGame";

export class BaseballGameUtils {
  static makeGameResult(result: IHistoryItem) {
    const { input, strike, ball } = result;

    const inputString = input.join("");
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

  static makeGamesInfo(baseballGames: BaseballGame[]) {
    if (baseballGames.length === 0) {
      return "참여중인 사용자가 없습니다.";
    }
    let info = "참여중인 사용자 목록:\n";
    baseballGames.forEach((game, idx) => {
      if (idx === baseballGames.length - 1) {
        info += `${game.username}`;
      } else {
        info += `${game.username}, `;
      }
    });
    return info;
  }
}
