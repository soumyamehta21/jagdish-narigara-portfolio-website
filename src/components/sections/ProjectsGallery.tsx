import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { projectsData } from '../../data/siteData';
import { SectionHeader } from '../common/SectionHeader';
import styles from './ProjectsGallery.module.css';

export const ProjectsGallery: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = direction === 'left' ? -460 : 460;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="project" className={styles.projectsSection} aria-label="Portfolio Showcase">
      <div className={styles.container}>
        {/* Header with Navigation Controls */}
        <div className={styles.headerWrapper}>
          <SectionHeader
            eyebrow="Our Project"
            heading={<>The Proof is in <br />Our Portfolio</>}
            description="Browse a sampling of our favorite built incarnations of clients' imaginative expectations and our innovative solutions."
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

      {/* Horizontal Scroll Track */}
      <div className={styles.galleryWrapper}>
        <div
          ref={scrollContainerRef}
          className={styles.horizontalTrack}
          tabIndex={0}
          role="region"
          aria-label="Horizontal scrollable list of architecture projects"
        >
          {projectsData.map((project) => (
            <article key={project.id} className={styles.projectCard}>
              <div className={styles.cardInner}>
                <img
                  src={project.imageSrc}
                  alt={project.title}
                  className={styles.projectImage}
                  loading="lazy"
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
