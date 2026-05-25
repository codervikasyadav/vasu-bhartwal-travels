'use client';

import { useState, useEffect } from 'react';
import Snowfall from 'react-snowfall';

export default function SnowfallEffect() {
  const [mounted, setMounted] = useState(false);
  const [count, setCount] = useState(60);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const countVal = window.innerWidth < 768 ? 25 : 60;
    const timer = setTimeout(() => {
      setCount(countVal);
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <Snowfall
      snowflakeCount={count}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 10,
        pointerEvents: 'none',
      }}
      color="rgba(255, 255, 255, 0.8)"
      speed={[0.5, 2]}
      radius={[1, 3]}
      wind={[-0.5, 1]}
    />
  );
}
