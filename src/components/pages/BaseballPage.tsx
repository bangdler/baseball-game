"use client";
import React, { useRef } from "react";
import styled from "@emotion/styled";
import { useBaseballGame } from "../../hooks/useBaseballGame";

const Form = styled.form`
  padding: 1rem;
`;

const Title = styled.p`
  font-size: 2rem;
  font-weight: 700;
`;

const SubTitle = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
`;

const Description = styled.p``;

interface Props {}

const BaseballPage = ({}: Props) => {
  const { checkAndAddHistory, resetGame, history } = useBaseballGame();

  const inputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const input = inputRef.current?.value;
    if (!input) return;
    try {
      checkAndAddHistory(input);
      inputRef.current.value = "";
    } catch (e: unknown) {
      if (e instanceof Error) {
        alert(e.message);
      } else {
        console.error("Unknown error:", e);
      }
    }
  };

  const lastInput = history.at(-1);

  return (
    <Form onSubmit={submitHandler}>
      <Title>⚾️ 숫자 야구 게임</Title>
      <Description>1~9까지의 수를 중복없이 3개 입력해주세요.</Description>
      <input type="text" ref={inputRef} />
      <button>확인</button>
      <SubTitle>
        📄 결과{" "}
        {lastInput === undefined ? "" : lastInput.isAnswer ? "정답" : "오답"}
      </SubTitle>
      {history.map((item) => (
        <SubTitle key={item.input.join("")}>
          {item.input.join("")}: {item.strike}스트라이크 {item.ball}볼
        </SubTitle>
      ))}
      <button onClick={resetGame} disabled={!lastInput?.isAnswer}>
        초기화
      </button>
    </Form>
  );
};

export default BaseballPage;
