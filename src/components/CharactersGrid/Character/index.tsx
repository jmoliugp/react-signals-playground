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

const useCharacter = ({ id, sithCounter, jedi, sith }: CharacterProps) => {
  const [character, setCharacter] = useState<Character | undefined>(undefined);

  const minDelay = 100;
  const maxDelay = 4000;
  const delay =
    Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

  useEffect(() => {
    const currCharacter = id <= sithCounter ? sith : jedi;
    const isNewCharacter = currCharacter !== character;
    if (isNewCharacter) {
      setCharacter(undefined);
    }

    setTimeout(() => {
      // setCharacter(undefined);
      const newCharacter = id <= sithCounter ? sith : jedi;
      setCharacter(newCharacter);
    }, delay);
  }, [id, sithCounter, jedi, sith, delay, character]);

  return character;
};

const expensiveCalculation = () => {
  const minDelay = 4;
  const maxDelay = 40;
  const delay =
    Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

  const start = Date.now();
  while (Date.now() - start < delay) {
    // Loop to force a delay.
  }
};

export const CharacterSwapi: React.FC<CharacterProps> = (props) => {
  const character = useCharacter(props);
  // expensiveCalculation();

  const imageSrc = character
    ? `./swapiCharacters/${character.id}.jpg`
    : unknownAvatar;
  const title = character ? character.name : "Loading...";

  return (
    <Profiler id={`Character ${props.id}`}>
      <div key={props.id} className="gridItem">
        <div className="image-container">
          <img className="character-avatar" src={imageSrc} alt={title} />
          {character && (
            <img
              className="affiliation-logo"
              src={
                character.affiliation === Affiliation.Jedi ? jediIcon : sithIcon
              }
              alt="Affiliation Logo"
            />
          )}
        </div>
        <h2 className="character-name">{title}</h2>
      </div>
    </Profiler>
  );
};
