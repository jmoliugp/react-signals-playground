import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { getJediAndSithIds } from "./utils/getJedisAndSiths";
import { GridSwapiCharacters } from "./components/Character";
import { Character } from "./entities/character";

function App() {
  const [count, setCount] = useState(0);
  const [jedis, setJedis] = useState<Character[]>([]);
  const [siths, setSiths] = useState<Character[]>([]);

  useEffect(() => {
    (async () => {
      const { jedis, siths } = await getJediAndSithIds();

      setJedis(jedis);
      setSiths(siths);
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
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <GridSwapiCharacters jedis={jedis} siths={siths} sithCounter={count} />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
