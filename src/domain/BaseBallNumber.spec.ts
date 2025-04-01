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

  const dummys = [
    {
      input: "456",
      result: { strike: 0, ball: 0 },
    },
    {
      input: "145",
      result: { strike: 1, ball: 0 },
    },
    {
      input: "715",
      result: { strike: 0, ball: 1 },
    },
    {
      input: "321",
      result: { strike: 1, ball: 2 },
    },
    {
      input: "312",
      result: { strike: 0, ball: 3 },
    },
    {
      input: "123",
      result: { strike: 3, ball: 0 },
    },
  ];
  const answer = new BaseBallNumber("123");
  it.each(dummys)(
    "compareTo 메서드 - 스트라이크, 볼 개수 확인. input: $input",
    (dummy) => {
      const baseballNumber = new BaseBallNumber(dummy.input);
      const result = answer.compareTo(baseballNumber);
      expect(result).toEqual(dummy.result);
    }
  );
});
