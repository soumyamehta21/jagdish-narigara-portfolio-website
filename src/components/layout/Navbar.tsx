import React, { useState, useEffect, useMemo } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks, studioInfo } from '../../data/siteData';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const prefersReduced = useReducedMotion();

  const sectionHrefs = useMemo(() => navLinks.map((link) => link.href), []);
  const { activeSection, scrollToSection } = useActiveSection(sectionHrefs);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollToSection(href, !prefersReduced);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        <a
          href="#home"
          className={styles.brand}
          onClick={(e) => handleLinkClick(e, '#home')}
        >
          <span className={styles.brandName}>{studioInfo.name}</span>
        </a>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav} aria-label="Main Navigation">
          <ul className={styles.navList}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <li key={link.id} className={styles.navItem}>
                  <a
                    href={link.href}
                    className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span>{link.label}</span>
                    <span
                      className={`${styles.activeDot} ${isActive ? styles.activeDotVisible : ''}`}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Contact CTA */}
        <div className={styles.navActions}>
          <a
            href={studioInfo.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactBtn}
            aria-label="Enquire via WhatsApp"
          >
            Enquiry
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className={styles.mobileToggle}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.drawerOpen : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <ul className={styles.mobileList}>
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <li key={link.id} className={styles.mobileItem}>
                <a
                  href={link.href}
                  className={`${styles.mobileLink} ${isActive ? styles.mobileActive : ''}`}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className={styles.mobileLinkContent}>
                    <span
                      className={`${styles.mobileActiveDot} ${isActive ? styles.mobileActiveDotVisible : ''}`}
                      aria-hidden="true"
                    />
                    <span>{link.label}</span>
                  </span>
                </a>
              </li>
            );
          })}
          <li className={styles.mobileItem}>
            <a
              href={studioInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileContactBtn}
              onClick={() => setMobileMenuOpen(false)}
            >
              Get in Touch (WhatsApp)
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};
