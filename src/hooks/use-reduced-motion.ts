'use client';

import { useEffect, useState } from 'react';

/**
 * Returns true when animations should be disabled:
 * - User prefers reduced motion (accessibility)
 * - Screen width < 768px (mobile devices — save CPU/battery)
 */
export function useReducedMotion(): boolean {
  const [shouldReduce, setShouldReduce] = useState(false);

  useEffect(() => {
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mqMobile = window.matchMedia('(max-width: 767px)');

    const update = () => setShouldReduce(mqMotion.matches || mqMobile.matches);
    update();

    mqMotion.addEventListener('change', update);
    mqMobile.addEventListener('change', update);
    return () => {
      mqMotion.removeEventListener('change', update);
      mqMobile.removeEventListener('change', update);
    };
  }, []);

  return shouldReduce;
}

/** Static variant helpers: returns {} when motion is reduced */
export const noMotion = { initial: undefined, animate: undefined, whileInView: undefined, transition: undefined };
