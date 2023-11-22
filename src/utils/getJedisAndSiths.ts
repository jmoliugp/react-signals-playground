import axios, { AxiosResponse } from "axios";
import { Affiliation, Character, CharacterRaw } from "../entities/character";

const jedisKnownNames = [
  "Luke Skywalker",
  "Obi-Wan Kenobi",
  "Yoda",
  "Anakin Skywalker",
  "Mace Windu",
  "Qui-Gon Jinn",
  "Ahsoka Tano",
  "Ki-Adi-Mundi",
  "Shaak Ti",
  "Kit Fisto",
  "Plo Koon",
  "Kanan Jarrus",
  "Ezra Bridger",
  "Luminara Unduli",
  "Aayla Secura",
  "Rey",
  "Cal Kestis",
  "Adi Gallia",
  "Eeth Koth",
  "Depa Billaba",
];
const sithsKnownNames = [
  "Darth",
  "Darth Vader",
  "Palpatine",
  "Darth Maul",
  "Dooku",
  "Darth Plagueis",
  "Darth Bane",
  "Darth Revan",
  "Darth Malak",
  "Darth Nihilus",
  "Darth Sion",
  "Darth Traya",
  "Asajj Ventress",
  "Savage Opress",
  "Kylo Ren",
  "Darth Malgus",
  "Exar Kun",
  "Darth Krayt",
  "Darth Zannah",
  "Darth Tenebrous",
  "Darth Ruin",
  "Grievous",
  "Boba Fett",
  "Anakin Skywalke",
];

interface SWAPIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CharacterRaw[];
}

async function fetchAllCharacters(): Promise<Character[]> {
  let charactersRaw: CharacterRaw[] = [];
  let nextPageUrl: string | null = "https://swapi.dev/api/people/";

  while (nextPageUrl) {
    const response: AxiosResponse<SWAPIResponse> = await axios.get(nextPageUrl);
    charactersRaw = charactersRaw.concat(response.data.results);
    nextPageUrl = response.data.next;
  }

  return charactersRaw.map<Character>((characterRaw) => {
    const affiliation = sithsKnownNames.find((sithName) =>
      characterRaw.name.includes(sithName)
    )
      ? Affiliation.Sith
      : Affiliation.Jedi;
    const id = characterRaw.url.split("/").slice(-2, -1)[0];
    const name = characterRaw.name;

    return { affiliation, id, name };
  });
}

export async function getJediAndSithIds(): Promise<{
  jedis: Character[];
  siths: Character[];
}> {
  const characters = await fetchAllCharacters();
  const jedis = characters.filter(
    (character) => character.affiliation === Affiliation.Jedi
  );
  const siths = characters.filter(
    (character) => character.affiliation === Affiliation.Sith
  );

  return { jedis, siths };
}
