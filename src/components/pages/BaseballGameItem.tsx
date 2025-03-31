"use client";
import React, { useRef } from "react";
import styled from "@emotion/styled";
import { BaseballGameUtils } from "../../utils/BaseballGameUtils";
import BaseballGame from "../../domain/BaseballGame";

const Form = styled.form`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface Props {
  baseballGame: BaseballGame;
  onSubmit: ({ id, input }: { id: string; input: string }) => void;
  onDelete: (id: string) => void;
  isEnd: boolean;
}

const BaseballGameItem = ({
  baseballGame,
  onSubmit,
  onDelete,
  isEnd,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const input = inputRef.current?.value;
    if (!input) return;
    onSubmit({ id: baseballGame.id, input });
    inputRef.current.value = "";
  };

  return (
    <Form onSubmit={submitHandler}>
      <Header>
        <Title>⚾️ 숫자 야구 게임</Title>
        <button type="button" onClick={() => onDelete(baseballGame.id)}>
          삭제
        </button>
      </Header>
      <Description>사용자: {baseballGame.username}</Description>
      <Description>1~9까지의 수를 중복없이 3개 입력해주세요.</Description>
      <div>
        <input type="text" ref={inputRef} disabled={isEnd} />
        <button disabled={isEnd}>확인</button>
      </div>
      {!!baseballGame.history.length && (
        <SubTitle>📄 결과 {baseballGame.isEnd() ? "정답" : "오답"}</SubTitle>
      )}
      {baseballGame.history.map((item) => (
        <SubTitle key={item.input.join("")}>
          {BaseballGameUtils.makeGameResult(item)}
        </SubTitle>
      ))}
    </Form>
  );
};

export default BaseballGameItem;
