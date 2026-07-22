import { useRef, useEffect, type MutableRefObject } from "react";

type IntervalRef = MutableRefObject<ReturnType<typeof setInterval> | null>;

/** Roda um “sorteio” visual com ticks; limpa o interval no unmount. */
export function useRollAnimation(tickMs = 110) {
  const intervalRef: IntervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const clear = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const run = (ticks: number, onTick: () => void, onComplete: () => void) => {
    clear();
    let counter = 0;
    intervalRef.current = setInterval(() => {
      onTick();
      counter++;
      if (counter > ticks) {
        clear();
        onComplete();
      }
    }, tickMs);
  };

  return { run, clear };
}
