"use client";
import React, { useRef } from "react";
import styled from "@emotion/styled";
import { BaseballGameUtils } from "../../utils/BaseballGameUtils";
import { BaseballGamePlayer } from "../../domain/BaseballGamePlayer";

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
  player: BaseballGamePlayer;
  onSubmit: (input: string) => void;
  onDelete: (id: string) => void;
  isEnd: boolean;
  isActive: boolean;
  isWinPlayer: boolean;
}

const BaseballPlayer = ({
  player,
  onSubmit,
  onDelete,
  isEnd,
  isActive,
  isWinPlayer,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const input = inputRef.current?.value;
    if (!input) return;
    onSubmit(input);
    inputRef.current.value = "";
  };

  return (
    <Form onSubmit={submitHandler}>
      <Header>
        <Title>⚾️ 숫자 야구 게임</Title>
        <button type="button" onClick={() => onDelete(player.id)}>
          삭제
        </button>
      </Header>
      <Description>사용자: {player.name}</Description>
      <Description>1~9까지의 수를 중복없이 3개 입력해주세요.</Description>
      <div>
        <input type="text" ref={inputRef} disabled={isEnd || !isActive} />
        <button disabled={isEnd || !isActive}>확인</button>
      </div>
      {!!player.history.length && (
        <SubTitle>📄 결과 {isWinPlayer ? "정답" : "오답"}</SubTitle>
      )}
      {player.history.map((history) => (
        <SubTitle key={history.baseballNumber.numbers.join("")}>
          {BaseballGameUtils.historyToResultString(history)}
        </SubTitle>
      ))}
    </Form>
  );
};

export default BaseballPlayer;
