/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";

import { Affiliation, Character } from "../../entities/character";
import "./index.css";
import jediIcon from "/jediIcon.png";
import sithIcon from "/sithLogo.png";

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

  if (!character || id < 3) {
    return (
      <div key={id} className="gridItem">
        <div className="image-container">
          <div className="loader"></div>
        </div>
        <h2 className="character-name">Loading...</h2>
      </div>
    );
  }

  const imageSrc = `./swapiCharacters/${character.id}.jpg`;
  const affiliationLogoSrc =
    character.affiliation === Affiliation.Jedi ? jediIcon : sithIcon;

  return (
    <div key={character.id} className="gridItem">
      <div className="image-container">
        <img className="character-avatar" src={imageSrc} alt={character.name} />
        <img
          className="affiliation-logo"
          src={affiliationLogoSrc}
          alt="Affiliation Logo"
        />
      </div>
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
