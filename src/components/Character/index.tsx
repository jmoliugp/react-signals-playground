/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";

import { Character } from "../../entities/character";
import "./index.css";

interface SwapiGridItemProps {
  jedi?: Character;
  sith?: Character;
  sithCounter: number;
  id: number;
}

export const GridElementCharacter: React.FC<SwapiGridItemProps> = ({
  id,
  jedi,
  sith,
  sithCounter,
}) => {
  const character = id <= sithCounter ? sith : jedi;

  if (!character) {
    return (
      <div className="gridItem">
        <div className="loader"></div>
      </div>
    );
  }

  const imageSrc = `./swapiCharacters/${character.id}.jpg`;

  return (
    <div key={character.id} className="gridItem">
      <img className="character-avatar" src={imageSrc} alt={character.name} />
      <h2 className="character-name">{character.name}</h2>
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
