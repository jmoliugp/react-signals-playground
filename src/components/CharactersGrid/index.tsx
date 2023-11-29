import React from "react";

import { CharacterProps, CharacterSwapi } from "./Character";
import "./index.css";
import { Profiler } from "../Profiler";

export const CharactersGrid: React.FC = () => {
  const GRID_SIZE = 6;
  const gridItems: CharacterProps[] = Array.from(
    { length: GRID_SIZE * GRID_SIZE },
    (_, index) => {
      const id = index + 1;

      return { id };
    }
  );

  return (
    <Profiler id={`Character grid`}>
      <div className="gridContainer">
        {gridItems.map((props) => (
          <CharacterSwapi key={props.id} {...props} />
        ))}
      </div>
    </Profiler>
  );
};
