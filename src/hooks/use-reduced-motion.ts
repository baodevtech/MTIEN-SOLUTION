'use client';

import { useEffect, useState } from 'react';

/**
 * Returns true when animations should be disabled:
 * - User prefers reduced motion (accessibility)
 */
export function useReducedMotion(): boolean {
  const [shouldReduce, setShouldReduce] = useState(false);

  useEffect(() => {
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => setShouldReduce(mqMotion.matches);
    update();

    mqMotion.addEventListener('change', update);
    return () => {
      mqMotion.removeEventListener('change', update);
    };
  }, []);

  return shouldReduce;
}

/** Static variant helpers: returns {} when motion is reduced */
export const noMotion = { initial: undefined, animate: undefined, whileInView: undefined, transition: undefined };
