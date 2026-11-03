import { useRef, useEffect, useCallback, useState } from 'react';

/**
 * useScrollProgress – returns a 0→1 progress value based on how far
 * `wrapperRef` has been scrolled through.
 *
 * progress = 0  → top of wrapper just reached viewport top
 * progress = 1  → bottom of wrapper just reached viewport bottom
 *
 * Uses a passive scroll listener throttled by rAF — no scroll hijacking.
 */
export function useScrollProgress(wrapperRef: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  const rafId = useRef(0);

  const update = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      const el = wrapperRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const wh = window.innerHeight;

      // scrollable range: from when the top of the wrapper hits the viewport top
      // to when the bottom of the wrapper hits the viewport bottom.
      // That's (el.offsetHeight - wh) pixels of vertical scroll travel.
      const scrollable = el.offsetHeight - wh;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }

      // How far we've consumed: rect.top starts at some positive value,
      // becomes 0 when wrapper top reaches viewport top, goes negative as we scroll.
      const consumed = -rect.top;
      const p = Math.max(0, Math.min(1, consumed / scrollable));
      setProgress(p);
    });
  }, [wrapperRef]);

  useEffect(() => {
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    // Initial calculation
    update();

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      cancelAnimationFrame(rafId.current);
    };
  }, [update]);

  return progress;
}
