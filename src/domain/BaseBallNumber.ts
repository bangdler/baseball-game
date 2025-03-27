export type TBaseBallNumber = [number, number, number];

export default class BaseBallNumber {
  numbers: TBaseBallNumber;

  constructor(input: string) {
    if (this.valitdate(input)) {
      this.numbers = input.split("").map(Number) as TBaseBallNumber;
    } else {
      throw new Error("유효하지 않은 입력입니다.");
    }
  }

  valitdate(input: string) {
    let validate = true;
    const set = new Set(input.split(""));
    // 길이가 3개인지 확인
    if (input.length !== 3) {
      validate = false;
    }
    // 숫자인지 확인
    else if (Number.isNaN(Number(input))) {
      validate = false;
    }
    // 중복 확인
    else if (set.size !== 3) {
      validate = false;
    }

    return validate;
  }
}
