import { useRef, useEffect, useCallback, useState } from 'react';

/**
 * useScrollProgress – calculates a normalized 0→1 progress value based on how far
 * `wrapperRef` has been scrolled through while pinned at `topOffset`.
 *
 * progress = 0  → top of wrapper hits topOffset (sticky pins)
 * progress = 1  → bottom of wrapper hits viewport bottom (sticky unpins)
 *
 * Uses a passive scroll listener throttled by rAF — strictly native scrolling.
 */
export function useScrollProgress(
  wrapperRef: React.RefObject<HTMLElement | null>,
  topOffset = 0
) {
  const [progress, setProgress] = useState<number>(0);
  const rafId = useRef<number>(0);

  const update = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      const el = wrapperRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const stickyHeight = vh - topOffset;

      const scrollable = el.offsetHeight - stickyHeight;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }

      // Progress begins when rect.top hits topOffset, finishes when rect.bottom hits vh
      const consumed = topOffset - rect.top;
      const p = Math.max(0, Math.min(1, consumed / scrollable));
      setProgress(p);
    });
  }, [wrapperRef, topOffset]);

  useEffect(() => {
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      cancelAnimationFrame(rafId.current);
    };
  }, [update]);

  return progress;
}
