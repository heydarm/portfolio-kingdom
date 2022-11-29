import { useEffect, useRef, useState } from "react";
import { Room } from "./components/Room";
import { Character } from "./components/Character";
import { debounce } from "./utils/debounce";

function App() {
  const [state, setState] = useState<{
    x: number;
    y: number;
    direction: "left" | "right";
    state: "stand" | "walk";
  }>({ x: 50, y: 50, direction: "right", state: "stand" });
  const isJumping = useRef(false);

  useEffect(() => {
    const delta = 2;
    const jumpHeight = 10;

    const debouncedStop = debounce(() => {
      setState((prev) => ({ ...prev, state: "stand" }));
    }, 100);

    const handleKeydown = (e: KeyboardEvent) => {
      const { key } = e;
      if (key === "ArrowLeft") {
        setState((prev) => ({
          ...prev,
          x: prev.x - 1,
          direction: "left",
          state: "walk",
        }));
        debouncedStop();
      } else if (key === "ArrowRight") {
        setState((prev) => ({
          ...prev,
          x: prev.x + 1,
          direction: "right",
          state: "walk",
        }));
        debouncedStop();
      } else if (key === "ArrowUp") {
        if (isJumping.current) return;

        let tick = jumpHeight;
        setState((prev) => ({ ...prev, y: prev.y - tick }));
        isJumping.current = true;

        const interval = setInterval(() => {
          if (tick <= 0) {
            clearInterval(interval);
            isJumping.current = false;
            return;
          }
          setState((prev) => ({ ...prev, y: prev.y + delta }));
          tick -= delta;
        }, 100);
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <Room x={state.x} y={state.y}>
      <Character state={state.state} direction={state.direction} />
    </Room>
  );
}

export default App;
