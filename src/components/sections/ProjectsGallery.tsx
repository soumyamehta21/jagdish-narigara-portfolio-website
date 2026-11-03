import React, { useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { projectsData } from '../../data/siteData';
import { SectionHeader } from '../common/SectionHeader';
import styles from './ProjectsGallery.module.css';

/**
 * Portfolio Gallery — Scroll-Hijacked Horizontal Slideshow
 *
 * How it works:
 *  1. The <section> is made TALL: its height = 100vh + (total track width - viewport width).
 *     This gives us the exact scroll distance needed to slide all cards across.
 *  2. The inner `.stickyPane` is `position:sticky; top:0; height:100vh; overflow:hidden`.
 *     It stays pinned while the user is scrolling through the section.
 *  3. A rAF-based scroll listener maps vertical scroll progress → horizontal translateX.
 *     Transform is written directly to the DOM (no React state, no CSS transition)
 *     so it tracks the trackpad 1-to-1 with zero lag.
 *  4. When the user has scrolled past all cards the section ends naturally and
 *     normal page scroll resumes (unsticks automatically).
 */
export const ProjectsGallery: React.FC = () => {
  const sectionRef  = useRef<HTMLElement>(null);
  const stickyRef   = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const counterRef  = useRef<HTMLSpanElement>(null);
  const rafRef      = useRef<number>(0);

  /* ─── Recalculate section height so sticky zone is exactly right ─────── */
  const setSectionHeight = useCallback(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    const maxTranslate = Math.max(0, track.scrollWidth - window.innerWidth);
    section.style.height = `${window.innerHeight + maxTranslate}px`;
  }, []);

  /* ─── Scroll handler — maps vertical progress → horizontal translateX ── */
  const onScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const section = sectionRef.current;
      const track   = trackRef.current;
      const counter = counterRef.current;
      if (!section || !track) return;

      const rect = section.getBoundingClientRect();

      // How many px of vertical scroll are left inside the section
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      // Vertical offset from the top of the section (clamped to [0, scrollable])
      const consumed = Math.max(0, Math.min(scrollable, -rect.top));
      const progress = consumed / scrollable;                  // 0 → 1

      const maxTranslate = Math.max(0, track.scrollWidth - window.innerWidth);
      const translateX   = progress * maxTranslate;

      // Write transform directly — no React re-render, no CSS transition lag
      track.style.transform = `translate3d(-${translateX}px, 0, 0)`;

      // Update slide counter
      if (counter) {
        const total   = projectsData.length;
        const current = Math.min(total, Math.round(progress * (total - 1)) + 1);
        counter.textContent = `${String(current).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
      }
    });
  }, []);

  /* ─── Mount / unmount ────────────────────────────────────────────────── */
  useEffect(() => {
    // Wait for fonts / images to load so scrollWidth is accurate
    const init = () => {
      setSectionHeight();
      onScroll();
    };

    window.addEventListener('load',   init,          { once: true });
    window.addEventListener('resize', setSectionHeight, { passive: true });
    window.addEventListener('scroll', onScroll,      { passive: true });

    // Also run now (fonts may already be loaded)
    init();

    return () => {
      window.removeEventListener('resize', setSectionHeight);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [setSectionHeight, onScroll]);

  /* ─── Arrow buttons: jump one card width worth of vertical scroll ────── */
  const scrollByCard = useCallback((direction: 'left' | 'right') => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    const scrollable   = section.offsetHeight - window.innerHeight;
    const maxTranslate = Math.max(0, track.scrollWidth - window.innerWidth);
    if (scrollable <= 0 || maxTranslate <= 0) return;

    // One card (440px + 2rem gap ≈ 472px) expressed as vertical pixels
    const cardW       = 440 + 32;
    const verticalPx  = (cardW / maxTranslate) * scrollable;

    window.scrollBy({ top: direction === 'right' ? verticalPx : -verticalPx, behavior: 'smooth' });
  }, []);

  /* ─── Render ─────────────────────────────────────────────────────────── */
  return (
    <section
      id="project"
      ref={sectionRef}
      className={styles.gallerySection}
      aria-label="Portfolio Showcase"
    >
      {/* Sticky pane that pins for the duration of the section */}
      <div ref={stickyRef} className={styles.stickyPane}>

        {/* Header */}
        <div className={styles.container}>
          <div className={styles.headerWrapper}>
            <SectionHeader
              eyebrow="Portfolio Showcase"
              heading={<>The Proof is in <br />The Portfolio</>}
              description="Explore a curated portfolio of interior transformations, custom living environments, and photorealistic 3D visualizations."
              layout="split"
            />

            <div className={styles.navControls} aria-label="Gallery Navigation">
              <span
                ref={counterRef}
                className={styles.slideCounter}
                aria-live="polite"
                aria-atomic="true"
              >
                01 / {String(projectsData.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                className={styles.controlBtn}
                onClick={() => scrollByCard('left')}
                aria-label="Previous project"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                className={styles.controlBtn}
                onClick={() => scrollByCard('right')}
                aria-label="Next project"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontally-translated card track */}
        <div className={styles.galleryViewport}>
          <div
            ref={trackRef}
            className={styles.horizontalTrack}
            role="region"
            aria-label="Interior design project gallery — scroll to browse"
          >
            {projectsData.map((project, index) => (
              <article key={project.id} className={styles.projectCard}>
                <div className={styles.cardInner}>
                  <img
                    src={project.imageSrc}
                    alt={project.title}
                    className={styles.projectImage}
                    loading={index < 3 ? 'eager' : 'lazy'}
                    width="800"
                    height="600"
                  />
                  <div className={styles.cardGradient} />
                  <div className={styles.cardContent}>
                    <div className={styles.metaRow}>
                      <span className={styles.category}>{project.category}</span>
                      <span className={styles.year}>{project.year}</span>
                    </div>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.location}>{project.location}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Subtle scroll-hint hint at the bottom of the pane */}
        <p className={styles.scrollHint} aria-hidden="true">
          Scroll to explore projects
        </p>
      </div>
    </section>
  );
};
