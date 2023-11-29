import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import soloWarsLogo from "/soloWarsLogo.png";
import "./App.css";

import { getJediAndSithIds } from "./utils/getJedisAndSiths";
import { CharactersGrid } from "./components/CharactersGrid";

import { batch } from "@preact/signals-react";
import { jedis, sithCount, siths } from "./sharedSignals";

function App() {
  useEffect(() => {
    (async () => {
      const { jedisRes, sithsRes } = await getJediAndSithIds();

      batch(() => {
        jedis.value = jedisRes;
        siths.value = sithsRes;
      });
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
            onClick={() => (sithCount.value -= 1)}
            disabled={sithCount.value <= 0}
          >
            -
          </button>
          <button onClick={() => (sithCount.value += 1)}>
            Sith count is {sithCount}
          </button>
          <button onClick={() => (sithCount.value += 1)}>+</button>
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <CharactersGrid />
      </div>
      <p className="read-the-docs">
        Click on the Vite, React and SWAPI logos to learn more
      </p>
    </>
  );
}

export default App;
