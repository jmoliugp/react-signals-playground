import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import soloWarsLogo from "/soloWarsLogo.png";
import "./App.css";

import { getJediAndSithIds } from "./utils/getJedisAndSiths";
import { CharactersGrid } from "./components/CharactersGrid";
import { Character } from "./entities/character";

function App() {
  const [sithCount, setSithCount] = useState(0);
  const [characters, setCharacters] = useState<[Character[], Character[]]>([
    [],
    [],
  ]);
  const [jedis, siths] = characters;

  useEffect(() => {
    (async () => {
      const { jedis, siths } = await getJediAndSithIds();

      setCharacters([jedis, siths]);
    })();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://swapi.dev/" target="_blank">
          <img src={soloWarsLogo} className="logo solo" alt="Star Wars logo" />
        </a>
      </div>
      <h1>Vite + React + Swapi</h1>
      <div className="card">
        <div className="counter-container">
          <button
            onClick={() => setSithCount((count) => count - 1)}
            disabled={sithCount <= 0}
          >
            -
          </button>
          <button onClick={() => setSithCount((count) => count + 1)}>
            Sith count is {sithCount}
          </button>
          <button onClick={() => setSithCount((count) => count + 1)}>+</button>
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <CharactersGrid jedis={jedis} siths={siths} sithCounter={sithCount} />
      </div>
      <p className="read-the-docs">
        Click on the Vite, React and SWAPI logos to learn more
      </p>
    </>
  );
}

export default App;
