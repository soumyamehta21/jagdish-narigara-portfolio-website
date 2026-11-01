import React from 'react';
import { LayoutGrid, Layers, Sparkles } from 'lucide-react';
import { studioInfo } from '../../data/siteData';
import { getAssetUrl } from '../../utils/assetUrl';
import styles from './Philosophy.module.css';

export const Philosophy: React.FC = () => {
  return (
    <section id="abt" className={styles.aboutSection} aria-label="About Jagdish Narigara Interior Studio">
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.container}>
        {/* Visual Column: Luxury Interior Vignette */}
        <div className={styles.visualCol}>
          <div className={styles.imageCard}>
            <img
              src={getAssetUrl('images/project-5.jpg')}
              alt="Bespoke luxury interior space planning and custom joinery design"
              className={styles.showcaseImage}
              loading="lazy"
              width="900"
              height="700"
            />
            <div className={styles.imageOverlay} />

            {/* Floating Interior Studio Seal */}
            <div className={styles.floatingBadge}>
              <div className={styles.badgeIconWrap} aria-hidden="true">
                <Sparkles size={18} />
              </div>
              <div className={styles.badgeInfo}>
                <span className={styles.badgeTag}>Independent Practice</span>
                <span className={styles.badgeDetail}>Spatial Harmony &amp; 3D Precision</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Column: Interior Design Narrative & Pillars */}
        <div className={styles.contentCol}>
          <span className={styles.eyebrow}>The Independent Approach</span>
          <h2 className={styles.heading}>Crafting Interiors That Harmonize Elegance &amp; Ergonomics</h2>

          <div className={styles.narrative}>
            <p className={styles.leadPara}>
              As an independent interior designer and visualizer, I believe exceptional living environments
              are born where functional ergonomics, tactile materiality, and flattering illumination converge in effortless balance.
            </p>
            <p className={styles.bodyPara}>
              {studioInfo.philosophyBody}
            </p>
          </div>

          {/* 3 Core Interior Pillars */}
          <div className={styles.pillarsGrid}>
            <div className={styles.pillarItem}>
              <div className={styles.pillarIconWrap} aria-hidden="true">
                <LayoutGrid size={20} />
              </div>
              <div className={styles.pillarText}>
                <h3 className={styles.pillarTitle}>Ergonomic Space Planning</h3>
                <p className={styles.pillarDesc}>
                  Circulation flow, purposeful zoning, and tailored furniture placement designed around natural movement.
                </p>
              </div>
            </div>

            <div className={styles.pillarItem}>
              <div className={styles.pillarIconWrap} aria-hidden="true">
                <Layers size={20} />
              </div>
              <div className={styles.pillarText}>
                <h3 className={styles.pillarTitle}>Custom Millwork &amp; Detailing</h3>
                <p className={styles.pillarDesc}>
                  Millimeter-accurate wall elevations, bespoke wardrobe joinery, TV units, and material transitions.
                </p>
              </div>
            </div>

            <div className={styles.pillarItem}>
              <div className={styles.pillarIconWrap} aria-hidden="true">
                <Sparkles size={20} />
              </div>
              <div className={styles.pillarText}>
                <h3 className={styles.pillarTitle}>Visual Certainty Through 3D</h3>
                <p className={styles.pillarDesc}>
                  Photorealistic 3D renderings and lighting simulations to review every detail before site execution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
