import BaseballGame from "./BaseballGame";
import BaseBallNumber from "./BaseBallNumber";

describe("BaseballGame", () => {
  it("BaseballGame 인스턴스 생성 시 answer 프로퍼티에 3개의 랜덤한 숫자 배열을 할당한다.", () => {
    const baseballGame = new BaseballGame({ answer: [1, 2, 3] });
    expect(baseballGame.answer).toHaveLength(3);
  });

  const checks = [
    {
      input: "123",
      result: { strike: 3, ball: 0, isAnswer: true },
    },
    {
      input: "456",
      result: { strike: 0, ball: 0, isAnswer: false },
    },
    {
      input: "145",
      result: { strike: 1, ball: 0, isAnswer: false },
    },
    {
      input: "715",
      result: { strike: 0, ball: 1, isAnswer: false },
    },
    {
      input: "321",
      result: { strike: 1, ball: 2, isAnswer: false },
    },
    {
      input: "312",
      result: { strike: 0, ball: 3, isAnswer: false },
    },
  ];

  it.each(checks)(
    "check 메서드를 통해 입력 숫자와 정답을 비교하여 결과를 반환한다. input: $input",
    (check) => {
      const baseballGame = new BaseballGame({});
      const input = new BaseBallNumber(check.input);
      const result = baseballGame.check(input);
      expect(result).toEqual(check.result);
    }
  );
});
