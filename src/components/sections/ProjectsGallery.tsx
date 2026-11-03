import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { projectsData } from '../../data/siteData';
import { SectionHeader } from '../common/SectionHeader';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './ProjectsGallery.module.css';

export const ProjectsGallery: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const pauseTimeoutRef = useRef<number | null>(null);
  const prefersReduced = useReducedMotion();

  // Duplicate items for infinite seamless scroll
  const displayProjects = useMemo(() => [...projectsData, ...projectsData], []);

  // Continuous auto-scroll loop
  useEffect(() => {
    if (prefersReduced) return;

    let animationFrameId: number;
    const speed = 0.85; // Slow, elegant luxury gliding speed (~50px per second)

    const step = () => {
      const track = scrollContainerRef.current;
      if (track && !isPaused) {
        const halfWidth = track.scrollWidth / 2;
        if (halfWidth > 0 && track.scrollLeft >= halfWidth) {
          track.scrollLeft -= halfWidth;
        }
        track.scrollLeft += speed;
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (pauseTimeoutRef.current) window.clearTimeout(pauseTimeoutRef.current);
    };
  }, [isPaused, prefersReduced]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    const track = scrollContainerRef.current;
    if (!track) return;

    // Pause briefly on manual navigation so the user can inspect their chosen card
    setIsPaused(true);
    if (pauseTimeoutRef.current) window.clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = window.setTimeout(() => {
      setIsPaused(false);
    }, 4500);

    const halfWidth = track.scrollWidth / 2;
    const cardScrollAmount = 468; // 440px card + 28px gap
    const scrollDelta = direction === 'left' ? -cardScrollAmount : cardScrollAmount;

    // Prevent hitting hard left boundary when scrolling left
    if (direction === 'left' && track.scrollLeft < cardScrollAmount) {
      track.scrollLeft += halfWidth;
    } else if (direction === 'right' && track.scrollLeft >= halfWidth) {
      track.scrollLeft -= halfWidth;
    }

    track.scrollBy({
      left: scrollDelta,
      behavior: 'smooth',
    });
  }, []);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => {
    if (pauseTimeoutRef.current) window.clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = window.setTimeout(() => {
      setIsPaused(false);
    }, 2500);
  };

  return (
    <section id="project" className={styles.projectsSection} aria-label="Portfolio Showcase">
      <div className={styles.container}>
        {/* Header with Navigation Controls */}
        <div className={styles.headerWrapper}>
          <SectionHeader
            eyebrow="Portfolio Showcase"
            heading={<>The Proof is in <br />The Portfolio</>}
            description="Explore a curated portfolio of interior transformations, custom living environments, and photorealistic 3D visualizations."
            layout="split"
          />

          <div className={styles.navControls} aria-label="Gallery Navigation">
            <button
              type="button"
              className={styles.controlBtn}
              onClick={() => scroll('left')}
              aria-label="Scroll left in project gallery"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              className={styles.controlBtn}
              onClick={() => scroll('right')}
              aria-label="Scroll right in project gallery"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Track with Auto-Scroll & Hover Pause */}
      <div
        className={styles.galleryWrapper}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={scrollContainerRef}
          className={styles.horizontalTrack}
          tabIndex={0}
          role="region"
          aria-label="Horizontal scrollable list of interior design projects"
        >
          {displayProjects.map((project, index) => (
            <article key={`${project.id}-${index}`} className={styles.projectCard}>
              <div className={styles.cardInner}>
                <img
                  src={project.imageSrc}
                  alt={project.title}
                  className={styles.projectImage}
                  loading={index < 4 ? 'eager' : 'lazy'}
                  width="800"
                  height="600"
                />
                <div className={styles.cardGradient} />

                {/* Floating Content Pill */}
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
    </section>
  );
};
