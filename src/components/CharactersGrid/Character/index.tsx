/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { Affiliation, Character } from "../../../entities/character";
import "./index.css";
import jediIcon from "/jediIcon.png";
import sithIcon from "/sithLogo.png";
import unknownAvatar from "/unknownAvatar.png";
import { Profiler } from "../../Profiler";

export interface CharacterProps {
  jedi?: Character;
  sith?: Character;
  sithCounter: number;
  id: number;
}

const expensiveCalculation = () => {
  const minDelay = 4;
  const maxDelay = 10;
  const delay =
    Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

  const start = Date.now();
  while (Date.now() - start < delay) {
    // Loop to force a delay.
  }
};

export const CharacterSwapi: React.FC<CharacterProps> = ({
  id,
  sithCounter,
  jedi,
  sith,
}) => {
  expensiveCalculation();
  const [character, setCharacter] = useState<Character | undefined>();

  // Simulate a complex calculation for the character.
  const complexCharacterCalculation = () => {
    const minDelay = 4;
    const maxDelay = 10;
    const delay =
      Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

    const start = Date.now();
    while (Date.now() - start < delay) {
      // Loop to force a delay.
    }

    return id <= sithCounter ? sith : jedi;
  };

  useEffect(() => {
    setCharacter(complexCharacterCalculation());
  }, [sithCounter]);

  const title = character ? character.name : "Loading...";
  const imageSrc = character ? character.image : unknownAvatar;
  const iconSrc =
    character?.affiliation === Affiliation.Jedi ? jediIcon : sithIcon;

  return (
    <Profiler id={`Character ${id}`} disabled={id !== 2}>
      <div key={id} className="gridItem">
        <div className="image-container">
          <img className="character-avatar" src={imageSrc} alt={title} />
          {character && (
            <img
              className="affiliation-logo"
              src={iconSrc}
              alt="Affiliation Logo"
            />
          )}
        </div>
        <h2 className="character-name">{title}</h2>
      </div>
    </Profiler>
  );
};
