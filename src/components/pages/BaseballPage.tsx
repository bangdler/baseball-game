"use client";
import React, { useRef } from "react";
import styled from "@emotion/styled";
import { useBaseballGame } from "../../hooks/useBaseballGame";
import { BaseballGameUtils } from "../../utils/BaseballGameUtils";

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
  const { checkAndAddHistory, resetGame, history, isEnd } = useBaseballGame();

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

  return (
    <Form onSubmit={submitHandler}>
      <Title>⚾️ 숫자 야구 게임</Title>
      <Description>1~9까지의 수를 중복없이 3개 입력해주세요.</Description>
      <div>
        <input type="text" ref={inputRef} disabled={isEnd} />
        <button disabled={isEnd}>확인</button>
      </div>
      {!!history.length && (
        <SubTitle>📄 결과 {isEnd ? "정답" : "오답"}</SubTitle>
      )}
      {history.map((item) => (
        <SubTitle key={item.input.join("")}>
          {BaseballGameUtils.makeGameResult(item)}
        </SubTitle>
      ))}
      <button onClick={resetGame} disabled={!isEnd}>
        초기화
      </button>
    </Form>
  );
};

export default BaseballPage;
