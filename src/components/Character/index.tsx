import React, { useEffect, useState } from "react";

import { Affiliation, Character } from "../../entities/character";
import "./index.css";
import jediIcon from "/jediIcon.png";
import sithIcon from "/sithLogo.png";
import unknownAvatar from "/unknownAvatar.png";

interface SwapiGridItemProps {
  jedi?: Character;
  sith?: Character;
  sithCounter: number;
  id: number;
}

const useCharacter = ({ id, sithCounter, jedi, sith }: SwapiGridItemProps) => {
  const [character, setCharacter] = useState<Character | undefined>(undefined);

  const minDelay = 100;
  const maxDelay = 2000;
  const delay =
    Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

  useEffect(() => {
    setCharacter(undefined);
    setTimeout(() => {
      const newCharacter = id <= sithCounter ? sith : jedi;
      setCharacter(newCharacter);
    }, delay);
  }, [id, sithCounter, jedi, sith, delay]);

  return character;
};

export const GridElementCharacter: React.FC<SwapiGridItemProps> = (props) => {
  const character = useCharacter(props);

  const imageSrc = character
    ? `./swapiCharacters/${character.id}.jpg`
    : unknownAvatar;
  const title = character ? character.name : "Loading...";

  return (
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
  );
};

interface GridSwapiCharactersProps {
  jedis: Character[];
  siths: Character[];
  sithCounter: number;
}

export const GridSwapiCharacters: React.FC<GridSwapiCharactersProps> = ({
  jedis,
  siths,
  sithCounter,
}) => {
  const GRID_SIZE = 6;
  const gridItems: SwapiGridItemProps[] = Array.from(
    { length: GRID_SIZE * GRID_SIZE },
    (_, index) => {
      const jedi = jedis[index % jedis.length];
      const sith = siths[index % siths.length];

      const id = index + 1;

      return { id, jedi, sith, sithCounter };
    }
  );

  return (
    <div className="gridContainer">
      {gridItems.map((props) => (
        <GridElementCharacter key={props.id} {...props} />
      ))}
    </div>
  );
};
