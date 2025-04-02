"use client";
import React, { useRef } from "react";
import styled from "@emotion/styled";

import { useBaseballGameManager } from "../../hooks/useBaseballGameManager";
import { BaseballGameUtils } from "../../utils/BaseballGameUtils";
import BaseballPlayer from "./BaseballPlayer";

const Form = styled.form`
  padding: 1rem;
`;

const Title = styled.p`
  font-size: 1rem;
  font-weight: 600;
`;

const Description = styled.p``;
const BaseeballGameContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const PlayerListContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

interface Props {}

const BaseballPage = ({}: Props) => {
  const {
    answer,
    addPlayer,
    removePlayer,
    runPlayer,
    resetGame,
    isEnd,
    isActivePlayer,
    players,
    isMaxPlayerCount,
    isWinPlayer,
  } = useBaseballGameManager();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmitUsername = (e: React.FormEvent) => {
    e.preventDefault();
    const username = inputRef.current?.value;
    if (!username) return;
    addPlayer(username);
    inputRef.current.value = "";
  };

  const handleClickCheckButton = (input: string) => {
    try {
      runPlayer(input);
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
          <input type="text" ref={inputRef} disabled={isMaxPlayerCount} />
          <button disabled={isMaxPlayerCount}>확인</button>
        </div>
        <button onClick={resetGame}>전체 초기화</button>
      </Form>
      <BaseeballGameContainer>
        <Description>
          {BaseballGameUtils.playerListToInfoString(players)}
        </Description>
        <PlayerListContainer>
          {players.map((player) => (
            <BaseballPlayer
              key={player.id}
              answer={answer}
              player={player}
              isEnd={isEnd}
              isActive={isActivePlayer(player.id)}
              isWinPlayer={isWinPlayer(player)}
              onSubmit={handleClickCheckButton}
              onDelete={removePlayer}
            />
          ))}
        </PlayerListContainer>
      </BaseeballGameContainer>
    </>
  );
};

export default BaseballPage;
