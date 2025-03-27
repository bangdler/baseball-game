"use client";
import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import { useBaseballGame } from "../../hooks/useBaseballGame";
import BaseBallNumber from "../../domain/BaseBallNumber";

const Container = styled.form`
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
  const { checkAndAddHistory, resetGame, history, lastInput } =
    useBaseballGame();

  const inputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const input = inputRef.current?.value;
    if (!input) return;
    try {
      checkAndAddHistory(input);
      inputRef.current.value = "";
    } catch (e: unknown) {
      console.warn(e);
    }
  };

  return (
    <Container onSubmit={submitHandler}>
      <Title>⚾️ 숫자 야구 게임</Title>
      <Description>1~9까지의 수를 중복없이 3개 입력해주세요.</Description>
      <input type="text" ref={inputRef} />
      <button>확인</button>
      <SubTitle>📄 결과 {lastInput?.isAnswer ? "정답" : "오답"}</SubTitle>
      {history.map((item) => (
        <SubTitle key={item.input.join("")}>
          {item.input.join("")}: {item.strike}스트라이크 {item.ball}볼
        </SubTitle>
      ))}
      <button onClick={resetGame} disabled={!lastInput?.isAnswer}>
        초기화
      </button>
    </Container>
  );
};

export default BaseballPage;
