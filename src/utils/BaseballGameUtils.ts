import { IHistoryItem } from './../domain/BaseballGame';

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
}