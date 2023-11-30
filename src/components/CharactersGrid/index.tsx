import React from "react";

import { Character } from "../../entities/character";
import { CharacterProps, CharacterSwapi } from "./Character";
import "./index.css";
import { Profiler } from "../Profiler";

interface GridSwapiCharactersProps {
  jedis: Character[];
  siths: Character[];
  sithCounter: number;
}

const MemoCharacterSwapi = React.memo(CharacterSwapi, (oldProps, newProps) => {
  if (oldProps.sithCounter !== newProps.sithCounter) return false;
  if (oldProps.jedi?.id !== newProps.jedi?.id) return false;
  if (oldProps.sith?.id !== newProps.sith?.id) return false;
  return true;
});

export const CharactersGrid: React.FC<GridSwapiCharactersProps> = ({
  jedis,
  siths,
  sithCounter,
}) => {
  const GRID_SIZE = 6;
  const gridItems: CharacterProps[] = Array.from(
    { length: GRID_SIZE * GRID_SIZE },
    (_, index) => {
      const jedi = jedis[index % jedis.length];
      const sith = siths[index % siths.length];

      const id = index + 1;

      return { id, jedi, sith, sithCounter };
    }
  );

  return (
    <Profiler id={`Character grid`}>
      <div className="gridContainer">
        {gridItems.map((props) => (
          <MemoCharacterSwapi key={props.id} {...props} />
        ))}
      </div>
    </Profiler>
  );
};
