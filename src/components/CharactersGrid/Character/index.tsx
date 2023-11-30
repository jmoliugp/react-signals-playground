/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import { computed } from "@preact/signals-react";
import { Affiliation } from "../../../entities/character";
import { jedis, sithCount, siths } from "../../../sharedSignals";
import { Profiler } from "../../Profiler";
import "./index.css";
import jediIcon from "/jediIcon.png";
import sithIcon from "/sithLogo.png";
import unknownAvatar from "/unknownAvatar.png";

export interface CharacterProps {
  id: number;
}

export const CharacterSwapi: React.FC<CharacterProps> = ({ id }) => {
  const character = computed(() => {
    const charactersList = (sithCount.value > id ? siths : jedis).value;
    return charactersList[id % charactersList.length];
  }).value;

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
