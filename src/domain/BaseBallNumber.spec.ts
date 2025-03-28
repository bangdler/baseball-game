import BaseBallNumber from "./BaseBallNumber";

describe("BaseBallNumber", () => {
  it("유효한 입력인 경우, numbers 프로퍼티에 숫자 배열을 할당한다.", () => {
    const baseBallNumber = new BaseBallNumber("123");
    expect(baseBallNumber.numbers).toEqual([1, 2, 3]);
  });

  const invalidLengthInput = ["1", "12", "1234", "12345"];
  const nanInput = ["abc", "1a2", "12b", "123c"];
  const duplicatedNumberInput = ["111", "112", "121", "211", "343"];

  const error = new Error("유효하지 않은 입력입니다.");

  it.each(invalidLengthInput)(
    "유효하지 않은 입력(길이가 3개가 아닌 경우), 에러를 던진다. input: %s",
    (input) => {
      expect(() => new BaseBallNumber(input)).toThrow(error);
    }
  );

  it.each(nanInput)(
    "유효하지 않은 입력(숫자가 아닌 경우), 에러를 던진다. input: %s",
    (input) => {
      expect(() => new BaseBallNumber(input)).toThrow(error);
    }
  );

  it.each(duplicatedNumberInput)(
    "유효하지 않은 입력(숫자가 중복된 경우), 에러를 던진다. input: %s",
    (input) => {
      expect(() => new BaseBallNumber(input)).toThrow(error);
    }
  );
});
