import React from 'react';
import { studioInfo, navLinks, socialLinks } from '../../data/siteData';
import { Button } from '../common/Button';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <footer className={styles.footerSection} aria-label="Studio Footer">
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          {/* Main Studio Info Column */}
          <div className={styles.mainCol}>
            <h3 className={styles.brandTitle}>{studioInfo.name}</h3>
            <p className={styles.tagline}>{studioInfo.headline}</p>

            <div className={styles.contactDetails}>
              <p className={styles.contactLine}>
                <span className={styles.contactLabel}>Phone:</span>{' '}
                <a href={`tel:${studioInfo.phone.replace(/\s+/g, '')}`} className={styles.contactLink}>
                  {studioInfo.phone}
                </a>
              </p>
              <p className={styles.contactLine}>
                <span className={styles.contactLabel}>Mail:</span>{' '}
                <a href={`mailto:${studioInfo.email}`} className={styles.contactLink}>
                  {studioInfo.email}
                </a>
              </p>
              <p className={styles.contactLine}>
                <span className={styles.contactLabel}>Address:</span> {studioInfo.address}
              </p>
            </div>

            <div className={styles.ctaWrapper}>
              <Button
                href={studioInfo.whatsappUrl}
                target="_blank"
                variant="solid"
                iconType="arrow-up-right"
                ariaLabel="Get in touch on WhatsApp"
              >
                Get in touch
              </Button>
            </div>
          </div>

          {/* Main Pages Column */}
          <div className={styles.linksCol}>
            <h4 className={styles.linksHeading}>Main Pages</h4>
            <ul className={styles.linksList}>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className={styles.footerLink}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links Column */}
          <div className={styles.linksCol}>
            <h4 className={styles.linksHeading}>Social Links</h4>
            <ul className={styles.linksList}>
              {socialLinks.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.footerLink}
                  >
                    {item.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright Line */}
        <div className={styles.copyrightRow}>
          <p className={styles.copyrightText}>
            {studioInfo.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};
