export interface Character {
  id: string;
  name: string;
  affiliation: Affiliation;
}

export interface CharacterRaw {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export enum Affiliation {
  Jedi = "Jedi",
  Sith = "Sith",
  None = "None",
}
