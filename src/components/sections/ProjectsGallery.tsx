import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { projectsData } from '../../data/siteData';
import { ProjectItem } from '../../types';
import { SectionHeader } from '../common/SectionHeader';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { ProjectGalleryModal } from './ProjectGalleryModal';
import styles from './ProjectsGallery.module.css';

/**
 * Portfolio Gallery — Scroll-Driven Horizontal Slideshow
 *
 * Requirements satisfied:
 *  1. Pinned container (position: sticky; top: var(--header-height); height: calc(100svh - var(--header-height)))
 *  2. Travel distance calculated as: trackScrollWidth - viewportWidth + endInset
 *     where endInset equals section's left content padding.
 *  3. Last card ends fully visible with symmetrical spacing matching left padding; title never truncated.
 *  4. Sticky wrapper height derived from travelDistance (stickyHeight + travelDistance),
 *     releasing cleanly with zero empty gap.
 *  5. ResizeObserver + font/image load listeners for responsive recalculations.
 *  6. Every card is an accessible button opening a full lightbox modal gallery.
 */

const SLIDE_COUNT = projectsData.length;

export const ProjectsGallery: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [headerHeight, setHeaderHeight] = useState<number>(72);
  const [travelDistance, setTravelDistance] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Hook receives dynamic topOffset so progress maps 0→1 strictly during sticky lifespan
  const progress = useScrollProgress(wrapperRef, headerHeight);

  // Measure track scrollWidth and compute exact travel distance
  const recalculateDimensions = useCallback(() => {
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    if (!track || !wrapper) return;

    // Dynamically measure fixed header height
    const headerEl = document.querySelector('header');
    const measuredHeader = headerEl ? headerEl.getBoundingClientRect().height : 72;
    setHeaderHeight(measuredHeader);
    document.documentElement.style.setProperty('--header-height', `${measuredHeader}px`);

    // Read endInset from computed padding-left of track
    const trackStyle = window.getComputedStyle(track);
    const endInset = parseFloat(trackStyle.paddingLeft) || 32;

    // Part A Requirement: trackScrollWidth - viewportWidth + endInset
    const trackScrollWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;
    const maxTravel = Math.max(0, trackScrollWidth - viewportWidth + endInset);

    setTravelDistance(maxTravel);

    // Height of sticky zone
    const stickyHeight = window.innerHeight - measuredHeader;
    wrapper.style.height = `${stickyHeight + maxTravel}px`;
  }, []);

  // Set up listeners and ResizeObserver for reliable dimension calculation
  useEffect(() => {
    recalculateDimensions();

    const track = trackRef.current;
    const resizeObserver = new ResizeObserver(() => {
      recalculateDimensions();
    });

    if (track) resizeObserver.observe(track);
    if (wrapperRef.current) resizeObserver.observe(wrapperRef.current);

    window.addEventListener('resize', recalculateDimensions, { passive: true });
    window.addEventListener('orientationchange', recalculateDimensions, { passive: true });

    // Recalculate once web fonts finish loading
    if (document.fonts?.ready) {
      document.fonts.ready.then(recalculateDimensions);
    }

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', recalculateDimensions);
      window.removeEventListener('orientationchange', recalculateDimensions);
    };
  }, [recalculateDimensions]);

  // Active slide index (0 to SLIDE_COUNT - 1)
  const activeIndex = useMemo(() => {
    if (SLIDE_COUNT <= 1) return 0;
    return Math.min(SLIDE_COUNT - 1, Math.round(progress * (SLIDE_COUNT - 1)));
  }, [progress]);

  // Compute translateX: clamped between 0 and travelDistance
  const translateX = useMemo(() => {
    if (travelDistance <= 0) return 0;
    return Math.max(0, Math.min(travelDistance, progress * travelDistance));
  }, [travelDistance, progress]);

  const counterText = `${String(activeIndex + 1).padStart(2, '0')} / ${String(SLIDE_COUNT).padStart(2, '0')}`;

  // Smooth scroll by one slide distance
  const scrollBySlide = (direction: 'prev' | 'next') => {
    if (travelDistance <= 0) return;
    const slideStep = travelDistance / Math.max(1, SLIDE_COUNT - 1);
    const delta = direction === 'next' ? slideStep : -slideStep;
    window.scrollBy({ top: delta, behavior: 'smooth' });
  };

  const handleOpenGallery = (project: ProjectItem) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseGallery = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="project" aria-label="Portfolio Showcase">
      {/* Outer wrapper: height dynamically set to (stickyHeight + travelDistance) */}
      <div ref={wrapperRef} className={styles.outerWrapper}>
        {/* Sticky Viewport: pinned below navbar */}
        <div
          className={styles.stickyViewport}
          style={{
            top: `${headerHeight}px`,
            height: `calc(100vh - ${headerHeight}px)`,
            maxHeight: `calc(100vh - ${headerHeight}px)`,
          }}
        >
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
                  disabled={activeIndex === 0}
                  aria-label="Previous project"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  className={styles.navBtn}
                  onClick={() => scrollBySlide('next')}
                  disabled={activeIndex === SLIDE_COUNT - 1}
                  aria-label="Next project"
                >
                  <ChevronRight size={22} />
                </button>
              </div>
            </div>
          </div>

          {/* Card Track Viewport */}
          <div className={styles.trackContainer}>
            <div
              ref={trackRef}
              className={styles.track}
              style={{
                transform: `translate3d(-${translateX}px, 0, 0)`,
              }}
            >
              {projectsData.map((project, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={project.id}
                    type="button"
                    className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
                    onClick={() => handleOpenGallery(project)}
                    aria-label={`View ${project.title} gallery (${project.category}, ${project.year})`}
                  >
                    <div className={styles.cardInner}>
                      <img
                        src={project.imageSrc}
                        alt=""
                        className={styles.cardImage}
                        loading={i < 3 ? 'eager' : 'lazy'}
                        onLoad={recalculateDimensions}
                        width="800"
                        height="600"
                      />
                      <div className={styles.cardGradient} />

                      {/* Interactive View Gallery Pill */}
                      <div className={styles.viewGalleryPill} aria-hidden="true">
                        <Eye size={14} />
                        <span>View Gallery</span>
                      </div>

                      <div className={styles.cardContent}>
                        <div className={styles.metaRow}>
                          <span className={styles.category}>{project.category}</span>
                          <span className={styles.year}>{project.year}</span>
                        </div>
                        <h3 className={styles.cardTitle}>{project.title}</h3>
                        <p className={styles.location}>{project.location}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scroll hint */}
          <p className={styles.scrollHint} aria-hidden="true">
            Scroll to explore projects
          </p>
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      <ProjectGalleryModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseGallery}
      />
    </section>
  );
};
