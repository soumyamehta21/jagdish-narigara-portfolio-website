import React from 'react';
import { studioInfo } from '../../data/siteData';
import { Button } from '../common/Button';
import { getAssetUrl } from '../../utils/assetUrl';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
  return (
    <section id="home" className={styles.heroSection} aria-label="Hero Introduction">
      {/* Background Interior Atmosphere Video */}
      <div className={styles.mediaBackground}>
        <video
          className={styles.heroVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={getAssetUrl('images/hero.jpg')}
          aria-hidden="true"
        >
          <source src={getAssetUrl('videos/hero-bg.mp4')} type="video/mp4" />
        </video>
        <div className={styles.overlay} />
      </div>

      <div className={styles.heroContainer}>
        {/* Status Badge */}
        <div className={styles.badgeWrapper}>
          <div className={styles.statusBadge}>
            <span className="pulsing-dot" aria-hidden="true" />
            <span className={styles.badgeText}>{studioInfo.statusBadge}</span>
          </div>
        </div>

        {/* Hero Content */}
        <div className={styles.heroContent}>
          <div className={styles.headlineCol}>
            <h1 className={styles.headline}>
              Transforming Design Visions into <br className={styles.desktopBr} />
              Extraordinary Interior Experiences.
            </h1>
          </div>

          <div className={styles.ctaCol}>
            <p className={styles.subtext}>
              {studioInfo.headlineSub}
            </p>
            <div className={styles.actionWrap}>
              <Button
                href={studioInfo.whatsappUrl}
                target="_blank"
                variant="outline"
                iconType="arrow-right"
                ariaLabel="Get in touch via WhatsApp"
              >
                Let's Connect
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
