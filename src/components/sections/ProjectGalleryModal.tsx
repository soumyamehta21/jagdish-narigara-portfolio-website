import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Tag } from 'lucide-react';
import { ProjectItem, ProjectGalleryImage } from '../../types';
import styles from './ProjectGalleryModal.module.css';

interface ProjectGalleryModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectGalleryModal: React.FC<ProjectGalleryModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isImgLoading, setIsImgLoading] = useState<boolean>(true);
  const [imgError, setImgError] = useState<boolean>(false);
  const [touchStartX, setTouchStartX] = useState<number>(0);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Normalise images array (falls back to cover image if empty)
  const images: ProjectGalleryImage[] = useMemo(() => {
    if (!project) return [];
    if (project.images && project.images.length > 0) {
      return project.images;
    }
    return [{ src: project.imageSrc, alt: project.title }];
  }, [project]);

  // Reset index whenever project opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIdx(0);
      setIsImgLoading(true);
      setImgError(false);
    }
  }, [isOpen, project]);

  // Preload adjacent images
  useEffect(() => {
    if (!isOpen || images.length <= 1) return;
    const nextIdx = (currentIdx + 1) % images.length;
    const prevIdx = (currentIdx - 1 + images.length) % images.length;

    const nextImg = new Image();
    nextImg.src = images[nextIdx].src;

    const prevImg = new Image();
    prevImg.src = images[prevIdx].src;
  }, [isOpen, currentIdx, images]);

  const goToPrev = useCallback(() => {
    if (images.length <= 1) return;
    setIsImgLoading(true);
    setImgError(false);
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToNext = useCallback(() => {
    if (images.length <= 1) return;
    setIsImgLoading(true);
    setImgError(false);
    setCurrentIdx((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Handle keyboard navigation, Escape, and focus trapping
  useEffect(() => {
    if (!isOpen) return;

    // Save active element to restore later
    previousFocusRef.current = document.activeElement as HTMLElement | null;

    // Focus close button initially
    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    // Lock background scroll with scrollbar-gutter: stable to prevent layout shift
    const originalOverflow = document.documentElement.style.overflow;
    const originalGutter = document.documentElement.style.scrollbarGutter;
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.scrollbarGutter = 'stable';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrev();
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
        return;
      }
      if (e.key === 'Tab') {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusable = dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.documentElement.style.overflow = originalOverflow;
      document.documentElement.style.scrollbarGutter = originalGutter;
      // Return focus to triggering card
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, onClose, goToPrev, goToNext]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) {
      goToNext();
    } else if (diff < -50) {
      goToPrev();
    }
  };

  if (!isOpen || !project) return null;

  const currentImage = images[currentIdx] || { src: project.imageSrc, alt: project.title };
  const counterLabel = `${String(currentIdx + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}`;

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="presentation"
    >
      <div
        ref={dialogRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Header bar */}
        <div className={styles.header}>
          <div className={styles.metaCol}>
            <div className={styles.tagsRow}>
              <span className={styles.categoryBadge}>
                <Tag size={12} aria-hidden="true" />
                {project.category}
              </span>
              <span className={styles.yearBadge}>
                <Calendar size={12} aria-hidden="true" />
                {project.year}
              </span>
              <span className={styles.locationBadge}>
                <MapPin size={12} aria-hidden="true" />
                {project.location}
              </span>
            </div>
            <h2 id="modal-project-title" className={styles.title}>
              {project.title}
            </h2>
          </div>

          <div className={styles.headerActions}>
            {images.length > 1 && (
              <span className={styles.counterBadge} aria-live="polite">
                {counterLabel}
              </span>
            )}
            <button
              ref={closeBtnRef}
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close project gallery"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Main Stage */}
        <div className={styles.stage}>
          {images.length > 1 && (
            <button
              type="button"
              className={`${styles.navArrow} ${styles.navArrowLeft}`}
              onClick={goToPrev}
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          <div className={styles.imageContainer}>
            {isImgLoading && !imgError && (
              <div className={styles.skeleton} aria-hidden="true">
                <div className={styles.spinner} />
              </div>
            )}

            {imgError ? (
              <div className={styles.errorFallback}>
                <p>Unable to load image.</p>
              </div>
            ) : (
              <img
                key={currentImage.src}
                src={currentImage.src}
                alt={currentImage.alt}
                className={`${styles.mainImage} ${isImgLoading ? styles.hiddenImage : styles.visibleImage}`}
                onLoad={() => setIsImgLoading(false)}
                onError={() => {
                  setIsImgLoading(false);
                  setImgError(true);
                }}
              />
            )}
          </div>

          {images.length > 1 && (
            <button
              type="button"
              className={`${styles.navArrow} ${styles.navArrowRight}`}
              onClick={goToNext}
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>

        {/* Caption */}
        {currentImage.caption && (
          <div className={styles.captionContainer}>
            <p className={styles.captionText}>{currentImage.caption}</p>
          </div>
        )}

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div
            className={styles.thumbnailStrip}
            role="tablist"
            aria-label="Project images thumbnail navigation"
          >
            {images.map((img, idx) => (
              <button
                key={img.src + idx}
                type="button"
                role="tab"
                aria-selected={idx === currentIdx}
                className={`${styles.thumbBtn} ${idx === currentIdx ? styles.thumbActive : ''}`}
                onClick={() => {
                  if (idx !== currentIdx) {
                    setIsImgLoading(true);
                    setImgError(false);
                    setCurrentIdx(idx);
                  }
                }}
                aria-label={`View image ${idx + 1}: ${img.alt}`}
              >
                <img src={img.src} alt="" className={styles.thumbImage} loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
