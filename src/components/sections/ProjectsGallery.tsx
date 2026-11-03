import React, { useRef, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { projectsData } from '../../data/siteData';
import { SectionHeader } from '../common/SectionHeader';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import styles from './ProjectsGallery.module.css';

/**
 * Portfolio Gallery — Scroll-Driven Horizontal Slideshow
 *
 * Architecture:
 *   <section.outerWrapper>          ← tall (slideCount × 100vh), creates scroll runway
 *     <div.stickyViewport>          ← position:sticky; top:0; height:100vh — pins in view
 *       <header> …                  ← section title + nav controls
 *       <div.trackContainer>        ← overflow:hidden clip box
 *         <div.track>               ← flex row, translated via inline transform
 *           <article.card> × N
 *
 * The outer wrapper's height gives the browser enough scroll distance.
 * useScrollProgress(wrapperRef) returns 0→1 as the user scrolls through it.
 * We map that progress to a horizontal translateX on the track.
 * No scroll hijacking — pure native scroll + sticky + transform.
 *
 * prefers-reduced-motion: falls back to a plain vertical stack.
 */

const SLIDE_COUNT = projectsData.length;

export const ProjectsGallery: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(wrapperRef);

  // Derive the active slide index (0-based) from progress
  const activeIndex = useMemo(() => {
    if (SLIDE_COUNT <= 1) return 0;
    return Math.min(SLIDE_COUNT - 1, Math.round(progress * (SLIDE_COUNT - 1)));
  }, [progress]);

  // The track translateX: at progress=0 show slide 0, at progress=1 show last slide.
  // Each slide takes (100% / SLIDE_COUNT) of the track width.
  // We shift by (progress * (SLIDE_COUNT - 1)) slides worth.
  // Using percentage of the track's own width via CSS calc.
  const translatePercent = useMemo(() => {
    if (SLIDE_COUNT <= 1) return 0;
    // Each card is (100 / SLIDE_COUNT)% of the track.
    // To show card N, we translate by N * (100 / SLIDE_COUNT)%.
    return progress * (SLIDE_COUNT - 1) * (100 / SLIDE_COUNT);
  }, [progress]);

  const counterText = `${String(activeIndex + 1).padStart(2, '0')} / ${String(SLIDE_COUNT).padStart(2, '0')}`;

  // Arrow buttons: scroll window by one slide's worth of vertical distance
  const scrollBySlide = (direction: 'prev' | 'next') => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const slideScrollHeight = (wrapper.offsetHeight - window.innerHeight) / Math.max(1, SLIDE_COUNT - 1);
    const delta = direction === 'next' ? slideScrollHeight : -slideScrollHeight;
    window.scrollBy({ top: delta, behavior: 'smooth' });
  };

  return (
    <section id="project" aria-label="Portfolio Showcase">
      {/*
        Outer wrapper — its height creates the scroll runway.
        Each slide gets 100vh of scroll travel.
      */}
      <div
        ref={wrapperRef}
        className={styles.outerWrapper}
        style={{ height: `${SLIDE_COUNT * 100}vh` }}
      >
        {/* Sticky viewport — stays pinned while scrolling through wrapper */}
        <div className={styles.stickyViewport}>
          {/* Header row */}
          <div className={styles.container}>
            <div className={styles.headerRow}>
              <SectionHeader
                eyebrow="Portfolio Showcase"
                heading={<>The Proof is in <br />The Portfolio</>}
                description="Explore a curated portfolio of interior transformations, custom living environments, and photorealistic 3D visualizations."
                layout="split"
              />

              <div className={styles.navControls} aria-label="Gallery navigation">
                <span
                  className={styles.counter}
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {counterText}
                </span>
                <button
                  type="button"
                  className={styles.navBtn}
                  onClick={() => scrollBySlide('prev')}
                  aria-label="Previous project"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  className={styles.navBtn}
                  onClick={() => scrollBySlide('next')}
                  aria-label="Next project"
                >
                  <ChevronRight size={22} />
                </button>
              </div>
            </div>
          </div>

          {/* Card track */}
          <div className={styles.trackContainer}>
            <div
              className={styles.track}
              style={{ transform: `translate3d(-${translatePercent}%, 0, 0)` }}
            >
              {projectsData.map((project, i) => (
                <article
                  key={project.id}
                  className={`${styles.card} ${i === activeIndex ? styles.cardActive : ''}`}
                >
                  <div className={styles.cardInner}>
                    <img
                      src={project.imageSrc}
                      alt={project.title}
                      className={styles.cardImage}
                      loading={i < 3 ? 'eager' : 'lazy'}
                      width="800"
                      height="600"
                    />
                    <div className={styles.cardGradient} />
                    <div className={styles.cardContent}>
                      <div className={styles.metaRow}>
                        <span className={styles.category}>{project.category}</span>
                        <span className={styles.year}>{project.year}</span>
                      </div>
                      <h3 className={styles.cardTitle}>{project.title}</h3>
                      <p className={styles.location}>{project.location}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Scroll hint */}
          <p className={styles.scrollHint} aria-hidden="true">
            Scroll to explore projects
          </p>
        </div>
      </div>
    </section>
  );
};
