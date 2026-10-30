import { useState, useEffect, useRef, useCallback } from 'react';

const HEADER_OFFSET = 70;

/**
 * Hook to track the active section based on viewport coverage.
 * Automatically computes which section occupies the largest visible portion of the viewport.
 */
export function useActiveSection(sectionHrefs: string[]) {
  const [activeSection, setActiveSection] = useState<string>(sectionHrefs[0] || '#home');
  const isManualScrollingRef = useRef<boolean>(false);
  const timeoutIdRef = useRef<number | null>(null);

  const calculateActiveSection = useCallback(() => {
    if (isManualScrollingRef.current) return;

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // Edge case 1: Near top of page
    if (scrollY < 80) {
      setActiveSection(sectionHrefs[0]);
      return;
    }

    // Edge case 2: Near bottom of page
    if (scrollY + windowHeight >= docHeight - 50) {
      setActiveSection(sectionHrefs[sectionHrefs.length - 1]);
      return;
    }

    // Collect DOM elements for each section and their absolute top offsets
    const items = sectionHrefs
      .map((href) => {
        const id = href.replace('#', '');
        const el = document.getElementById(id);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return {
          href,
          el,
          top: rect.top + scrollY,
        };
      })
      .filter((item): item is { href: string; el: HTMLElement; top: number } => item !== null)
      .sort((a, b) => a.top - b.top);

    if (items.length === 0) return;

    // Compute visible viewport coverage below the fixed header
    const viewportTop = scrollY + HEADER_OFFSET;
    const viewportBottom = scrollY + windowHeight;
    const effectiveViewportHeight = Math.max(1, windowHeight - HEADER_OFFSET);

    let maxCoverage = -1;
    let mostCoveredHref = items[0].href;

    for (let i = 0; i < items.length; i++) {
      const current = items[i];
      const sectionStart = i === 0 ? 0 : current.top;
      const sectionEnd = i === items.length - 1 ? docHeight : items[i + 1].top;

      const visibleTop = Math.max(viewportTop, sectionStart);
      const visibleBottom = Math.min(viewportBottom, sectionEnd);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const coverage = visibleHeight / effectiveViewportHeight;

      if (coverage > maxCoverage) {
        maxCoverage = coverage;
        mostCoveredHref = current.href;
      }
    }

    if (maxCoverage > 0) {
      setActiveSection(mostCoveredHref);
    }
  }, [sectionHrefs]);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(calculateActiveSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial check on mount scheduled asynchronously
    animationFrameId = requestAnimationFrame(calculateActiveSection);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (timeoutIdRef.current) {
        window.clearTimeout(timeoutIdRef.current);
      }
    };
  }, [calculateActiveSection]);

  const scrollToSection = useCallback((href: string, smooth = true) => {
    const id = href.replace('#', '');
    const element = document.getElementById(id);

    // Immediately reflect active tab selection
    setActiveSection(href);

    if (element) {
      isManualScrollingRef.current = true;

      if (timeoutIdRef.current) {
        window.clearTimeout(timeoutIdRef.current);
      }

      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - HEADER_OFFSET;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: smooth ? 'smooth' : 'auto',
      });

      window.history.pushState(null, '', href);

      // Re-enable automatic scroll detection after animation completes
      timeoutIdRef.current = window.setTimeout(() => {
        isManualScrollingRef.current = false;
        calculateActiveSection();
      }, 850);
    }
  }, [calculateActiveSection]);

  return { activeSection, scrollToSection };
}
