import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface UseCountUpOptions {
  target: number;
  duration?: number;
  padZero?: boolean;
}

export function useCountUp({ target, duration = 2000, padZero = false }: UseCountUpOptions) {
  const prefersReduced = useReducedMotion();
  const [count, setCount] = useState<number>(() => (prefersReduced ? target : 0));
  const elementRef = useRef<HTMLDivElement | null>(null);
  const hasAnimatedRef = useRef<boolean>(prefersReduced);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || hasAnimatedRef.current || prefersReduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          observer.disconnect();

          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Ease out expo for natural numeric deceleration
            const easeOutProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentCount = Math.floor(easeOutProgress * target);

            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [target, duration, prefersReduced]);

  const displayValue = padZero && count < 10 ? `0${count}` : `${count}`;

  return { elementRef, displayValue, rawValue: count };
}
