import React from 'react';
import { studioInfo } from '../../data/siteData';
import { Button } from '../common/Button';
import { getAssetUrl } from '../../utils/assetUrl';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
  return (
    <section id="home" className={styles.heroSection}>
      {/* Background Architectural Atmosphere */}
      <div className={styles.mediaBackground}>
        <img
          src={getAssetUrl('images/hero.jpg')}
          alt="Atmospheric modern luxury villa residence at dusk"
          className={styles.heroImage}
          loading="eager"
          fetchPriority="high"
          width="1920"
          height="1080"
        />
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
              We blend art &amp; science to create <br className={styles.desktopBr} />
              architectural magic.
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
                ariaLabel="Enquire via WhatsApp"
              >
                Enquiry us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
