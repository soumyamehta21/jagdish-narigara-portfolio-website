import React, { useRef, useState, useEffect } from 'react';
import { milestonesData, studioInfo } from '../../data/siteData';
import styles from './Timeline.module.css';

export const Timeline: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = rect.height;

      // Start progressing when top of timeline enters middle of viewport
      const startOffset = windowHeight / 2;
      const currentScroll = startOffset - rect.top;
      const progressRatio = Math.max(0, Math.min(1, currentScroll / totalHeight));

      setScrollProgress(progressRatio * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.journeySection} aria-label="Founder and Studio Journey">
      <div className={styles.container}>
        {/* Founder Bio Header Row */}
        <div className={styles.founderRow}>
          <div className={styles.founderContent}>
            <span className={styles.eyebrow}>{studioInfo.founderEyebrow}</span>
            <h2 className={styles.heading}>{studioInfo.founderHeading}</h2>
            <p className={styles.founderBio}>{studioInfo.founderIntro}</p>
            <div className={styles.founderSignature}>
              <strong className={styles.founderName}>{studioInfo.founderName}</strong>
              <span className={styles.founderTitle}>{studioInfo.founderTitle}</span>
            </div>
          </div>

          <div className={styles.founderImgCol}>
            <div className={styles.founderImgCard}>
              <img
                src="/images/founder.jpg"
                alt={`${studioInfo.founderName} - ${studioInfo.founderTitle}`}
                className={styles.founderPhoto}
                loading="lazy"
                width="600"
                height="600"
              />
              <div className={styles.founderBadgeOverlay}>
                <span>Established 2004</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Timeline Component */}
        <div ref={timelineRef} className={styles.timelineComponent}>
          {/* Progress Track */}
          <div className={styles.timelineProgressTrack} aria-hidden="true">
            <div
              className={styles.timelineProgressBar}
              style={{ height: `${scrollProgress}%` }}
            />
          </div>

          {/* 7 Milestones */}
          <div className={styles.itemsList}>
            {milestonesData.map((item) => (
              <div key={item.id} className={styles.timelineItem}>
                {/* Left: Sticky Date */}
                <div className={styles.timelineLeft}>
                  <div className={styles.dateText}>{item.date}</div>
                </div>

                {/* Center: Sticky Circle Node */}
                <div className={styles.timelineCentre} aria-hidden="true">
                  <div className={styles.nodeCircle} />
                </div>

                {/* Right: Milestone Title and Description */}
                <div className={styles.timelineRight}>
                  <div className={styles.milestoneCard}>
                    <h3 className={styles.milestoneTitle}>{item.title}</h3>
                    <p className={styles.milestoneDesc}>{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
