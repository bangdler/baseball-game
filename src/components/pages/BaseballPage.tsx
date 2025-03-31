"use client";
import React, { useRef } from "react";
import styled from "@emotion/styled";

import { useBaseballGameManager } from "../../hooks/useBaseballGameManager";
import BaseballGameItem from "./BaseballGameItem";
import { BaseballGameUtils } from "../../utils/BaseballGameUtils";

const Form = styled.form`
  padding: 1rem;
`;

const Title = styled.p`
  font-size: 1rem;
  font-weight: 600;
`;

const SubTitle = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
`;

const Description = styled.p``;
const BaseeballGameContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const BaseballGameList = styled.div`
  display: flex;
  gap: 1rem;
`;

interface Props {}

const BaseballPage = ({}: Props) => {
  const {
    addBaseballGame,
    removeBaseballGame,
    checkAndAddHistory,
    resetGame,
    isEnd,
    baseballGames,
    isMaxUserCount,
  } = useBaseballGameManager();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmitUsername = (e: React.FormEvent) => {
    e.preventDefault();
    const username = inputRef.current?.value;
    if (!username) return;
    addBaseballGame(username);
    inputRef.current.value = "";
  };

  const handleClickCheckButton = ({
    id,
    input,
  }: {
    id: string;
    input: string;
  }) => {
    try {
      checkAndAddHistory(id, input);
    } catch (e: unknown) {
      if (e instanceof Error) {
        alert(e.message);
      } else {
        console.error("Unknown error:", e);
      }
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmitUsername}>
        <Title>사용자 추가</Title>
        <Description>사용자를 추가해주세요.</Description>
        <div>
          <input type="text" ref={inputRef} disabled={isMaxUserCount} />
          <button disabled={isMaxUserCount}>확인</button>
        </div>
        <button onClick={resetGame}>전체 초기화</button>
      </Form>
      <BaseeballGameContainer>
        <Description>
          {BaseballGameUtils.makeGamesInfo(baseballGames)}
        </Description>
        <BaseballGameList>
          {baseballGames.map((baseballGame) => (
            <BaseballGameItem
              key={baseballGame.id}
              baseballGame={baseballGame}
              isEnd={isEnd}
              onSubmit={handleClickCheckButton}
              onDelete={removeBaseballGame}
            />
          ))}
        </BaseballGameList>
      </BaseeballGameContainer>
    </>
  );
};

export default BaseballPage;
