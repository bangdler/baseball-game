export type TBaseBallNumber = [number, number, number];

export default class BaseBallNumber {
  numbers: TBaseBallNumber;

  constructor(input: string) {
    const validateResult = this.valitdate(input);
    if (validateResult.result) {
      this.numbers = input.split("").map(Number) as TBaseBallNumber;
    } else {
      throw new Error(validateResult.message);
    }
  }

  valitdate(
    input: string
  ): { result: true } | { result: false; message: string } {
    let validate = true;
    let message = "";
    const set = new Set(input.split(""));
    // 길이가 3개인지 확인
    if (input.length !== 3) {
      validate = false;
      message = "세자리로 입력해주세요.";
    }
    // 숫자인지 확인
    else if (Number.isNaN(Number(input))) {
      validate = false;
      message = "숫자로 입력해주세요.";
    }
    // 중복 확인
    else if (set.size !== 3) {
      validate = false;
      message = "중복 없이 입력해주세요.";
    }

    return validate ? { result: true } : { result: false, message };
  }
}
