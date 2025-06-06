import BaseBallNumber from "./BaseBallNumber";

describe("BaseBallNumber", () => {
  it("유효한 입력인 경우, numbers 프로퍼티에 숫자 배열을 할당한다.", () => {
    const baseBallNumber = new BaseBallNumber("123");
    expect(baseBallNumber.numbers).toEqual([1, 2, 3]);
  });

  const invalidLengthInput = ["1", "12", "1234", "12345", "aaaaa", "1aa2"];
  const nanInput = ["abc", "1a2", "12b", "1cc"];
  const duplicatedNumberInput = ["111", "112", "121", "211", "343"];

  it.each(invalidLengthInput)(
    "유효하지 않은 입력(길이가 3개가 아닌 경우), 에러를 던진다. input: %s",
    (input) => {
      const error = new Error("세자리로 입력해주세요.");
      expect(() => new BaseBallNumber(input)).toThrow(error);
    }
  );

  it.each(nanInput)(
    "유효하지 않은 입력(숫자가 아닌 경우), 에러를 던진다. input: %s",
    (input) => {
      const error = new Error("숫자로 입력해주세요.");
      expect(() => new BaseBallNumber(input)).toThrow(error);
    }
  );

  it.each(duplicatedNumberInput)(
    "유효하지 않은 입력(숫자가 중복된 경우), 에러를 던진다. input: %s",
    (input) => {
      const error = new Error("중복 없이 입력해주세요.");
      expect(() => new BaseBallNumber(input)).toThrow(error);
    }
  );

  it("isEqual 메서드 - 같은 BaseballNumber인 경우 true를 반환한다", () => {
    const baseBallNumber = new BaseBallNumber("123");
    const baseBallNumber2 = new BaseBallNumber("123");
    expect(baseBallNumber.isEqual(baseBallNumber2)).toBe(true);
  });

  const notEqualBaseBallNumbers = ["456", "321", "124", "132", "523"];

  it.each(notEqualBaseBallNumbers)(
    "isEqual 메서드 - 다른 BaseballNumber인 경우 false를 반환한다. answer: 123, input: %s",
    (input) => {
      const baseBallNumber = new BaseBallNumber("123");
      const baseBallNumber2 = new BaseBallNumber(input);
      expect(baseBallNumber.isEqual(baseBallNumber2)).toBe(false);
    }
  );
});
