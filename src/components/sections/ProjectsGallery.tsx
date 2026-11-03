import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { projectsData } from '../../data/siteData';
import { SectionHeader } from '../common/SectionHeader';
import styles from './ProjectsGallery.module.css';

export const ProjectsGallery: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [containerHeight, setContainerHeight] = useState<number>(2400);
  const [currentIndex, setCurrentIndex] = useState<number>(1);

  // Measure track width and compute needed vertical scroll distance
  const updateDimensions = useCallback(() => {
    if (!trackRef.current) return;
    const trackWidth = trackRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    const maxTranslate = Math.max(0, trackWidth - viewportWidth);

    // 1.15 scrollFactor gives a balanced, natural trackpad translation speed
    const scrollDistance = maxTranslate * 1.15;
    setContainerHeight(window.innerHeight + scrollDistance);
  }, []);

  useEffect(() => {
    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    if (trackRef.current) {
      resizeObserver.observe(trackRef.current);
    }
    window.addEventListener('resize', updateDimensions);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, [updateDimensions]);

  // Synchronize window vertical scroll with horizontal track translation
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current || !trackRef.current) {
            ticking = false;
            return;
          }

          const rect = sectionRef.current.getBoundingClientRect();
          const scrollDistance = sectionRef.current.offsetHeight - window.innerHeight;

          if (scrollDistance > 0) {
            const currentY = -rect.top;
            const progress = Math.max(0, Math.min(1, currentY / scrollDistance));

            const trackWidth = trackRef.current.scrollWidth;
            const viewportWidth = window.innerWidth;
            const maxTranslate = Math.max(0, trackWidth - viewportWidth);

            const translateX = progress * maxTranslate;
            trackRef.current.style.transform = `translate3d(-${translateX}px, 0, 0)`;

            // Update current slide index indicator (1 to N)
            const activeIdx = Math.min(
              projectsData.length,
              Math.floor(progress * (projectsData.length - 1)) + 1
            );
            setCurrentIndex(activeIdx);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Chevron click jumps one card horizontally by scrolling the window vertically
  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!sectionRef.current || !trackRef.current) return;
    const trackWidth = trackRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    const maxTranslate = Math.max(0, trackWidth - viewportWidth);
    const scrollDistance = sectionRef.current.offsetHeight - window.innerHeight;

    if (scrollDistance <= 0 || maxTranslate <= 0) return;

    // Card width (approx 440px + 28px gap)
    const cardStep = 468;
    const verticalStep = (cardStep / maxTranslate) * scrollDistance;

    window.scrollBy({
      top: direction === 'right' ? verticalStep : -verticalStep,
      behavior: 'smooth',
    });
  }, []);

  return (
    <section
      id="project"
      ref={sectionRef}
      className={styles.stickySection}
      style={{ height: `${containerHeight}px` }}
      aria-label="Portfolio Showcase"
    >
      <div className={styles.stickyWrapper}>
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
              <span className={styles.slideCounter} aria-live="polite">
                {String(currentIndex).padStart(2, '0')} / {String(projectsData.length).padStart(2, '0')}
              </span>
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

        {/* Horizontal Track Translated by Trackpad Vertical Scroll */}
        <div className={styles.galleryViewport}>
          <div
            ref={trackRef}
            className={styles.horizontalTrack}
            tabIndex={0}
            role="region"
            aria-label="Trackpad-driven scrollable list of interior design projects"
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

                  {/* Content Overlay */}
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
      </div>
    </section>
  );
};
