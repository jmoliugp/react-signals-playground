## Notes for the presentation

## Memoization solution

### 1. Memoization of Components with `React.memo`

`React.memo` is a higher-order component that memoizes your component, so it only re-renders if its props have changed.

**Original Component:**

```javascript
export const GridElementCharacter: React.FC<SwapiGridItemProps> = (props) => {
  const character = useCharacter(props);
  // ... rest of the component ...
};
```

**Modified with `React.memo`:**

```javascript
export const GridElementCharacter =
  React.memo <
  SwapiGridItemProps >
  (({ jedi, sith, sithCounter, id }) => {
    const character = useCharacter({ jedi, sith, sithCounter, id });
    // ... rest of the component ...
  });
```

### 2. Use of `useCallback`

`useCallback` returns a memoized callback, ensuring that provided functions don't get recreated on every render unless their dependencies change.

**Potential Modification:**
Suppose you have a function that's being passed down to a child component, you can wrap it in `useCallback`. For example, if you had an event handler in `App`:

**Original Function:**

```javascript
function handleSomeAction() {
  // Some action logic
}
```

**Modified with `useCallback`:**

```javascript
const handleSomeAction = useCallback(
  () => {
    // Some action logic
  },
  [
    /* dependencies */
  ]
);
```

In your provided code, there aren't explicit examples of callback functions passed to children, but this is how you would apply `useCallback` if such scenarios existed.

### 3. Selective Rendering with `React.useMemo`

`useMemo` memorizes expensive calculations so that they are not recalculated on every render.

**Potential Use Case:**
If you have an expensive computation based on the `jedis` or `siths` arrays, you can use `useMemo`.

**Example:**

```javascript
const sortedJedis = useMemo(() => {
  return [...jedis].sort(/* some expensive sorting logic */);
}, [jedis]);

const filteredSiths = useMemo(() => {
  return siths.filter(/* some expensive filtering logic */);
}, [siths]);
```

In your current code, there isn't an explicit expensive computation, but this is how you would apply `useMemo` if such a situation arises.

### Applying These Changes to Your Code

Looking at your code, the most relevant place to apply these optimizations is in the `GridElementCharacter` component and possibly in the `GridSwapiCharacters` component for memoization. Since the `useCharacter` hook is already optimizing the character selection process, memoizing `GridElementCharacter` can help avoid unnecessary re-renders when the parent component re-renders but the props for `GridElementCharacter` haven't changed.

For `useCallback` and `useMemo`, their usage would be more situational and dependent on specific scenarios in your code where you're passing callbacks or doing expensive computations. Since those aren't explicitly present in the code you've shared, the above examples serve as a guide on how to implement them.

## Signals solution

### 1. Refactoring `useCharacter` Hook

The `useCharacter` hook currently causes re-renders whenever `id`, `sithCounter`, `jedi`, or `sith` change. With signals, we can optimize this.

**Original React Hook:**

```javascript
const useCharacter = ({ id, sithCounter, jedi, sith }: SwapiGridItemProps) => {
  const [character, setCharacter] =
    (useState < Character) | (undefined > undefined);
  // ... useEffect logic ...
  return character;
};
```

**Refactored with Signals:**

```javascript
import { signal, computed } from "preact/signals";

const useCharacterSignal = ({
  id,
  sithCounter,
  jedi,
  sith,
}: SwapiGridItemProps) => {
  const character = (signal < Character) | (undefined > undefined);

  computed(() => {
    character.value = undefined;
    setTimeout(() => {
      character.value = id <= sithCounter.value ? sith : jedi;
    }, delay);
  });

  return character;
};
```

**Avoided Re-renders:** This refactoring reduces re-renders by only updating the `character` signal when necessary. The `computed` function will only trigger a re-render when the specific dependencies (`id`, `sithCounter`, etc.) change, instead of re-rendering on every prop change.

### 2. Refactoring State Updates in `App`

The main `App` component has multiple states that trigger re-renders. Let's refactor these with signals.

**Original React State:**

```javascript
const [sithCount, setSithCount] = useState(0);
const [jedis, setJedis] = useState<Character[]>([]);
const [siths, setSiths] = useState<Character[]>([]);
```

**Refactored with Signals:**

```javascript
const sithCount = signal(0);
const jedis = signal<Character[]>([]);
const siths = signal<Character[]>([]);
```

**Avoided Re-renders:** With signals, updates to `sithCount`, `jedis`, and `siths` will be more efficient. Changes to these signals won't automatically trigger re-renders unless components are explicitly listening to these signals. This makes state management more efficient, especially when multiple states change together.

### 3. Batch Updating Signals

When fetching Jedi and Sith data, signals can be updated in a batch to avoid multiple re-renders.

**Original Data Fetching and State Update:**

```javascript
useEffect(() => {
  (async () => {
    const { jedis, siths } = await getJediAndSithIds();
    setJedis(jedis);
    setSiths(siths);
  })();
}, []);
```

**Refactored with Signals:**

```javascript
useEffect(() => {
  (async () => {
    const data = await getJediAndSithIds();
    batch(() => {
      jedis.value = data.jedis;
      siths.value = data.siths;
    });
  })();
}, []);
```

**Avoided Re-renders:** The `batch` function ensures that the signals are updated together in a single operation. This avoids the scenario where each signal update would trigger its own re-render, thus reducing the number of re-renders significantly.

### Conclusion

By refactoring with Preact signals, you gain more control over when components should re-render, reducing unnecessary updates. This is especially beneficial in large applications or components with complex state logic. The key is to utilize `signal`, `computed`, and `batch` functions to manage dependencies and updates efficiently. This approach leads to improved performance and a more responsive user interface.
