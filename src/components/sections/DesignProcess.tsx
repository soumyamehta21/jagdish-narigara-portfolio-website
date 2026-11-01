import React, { useState } from 'react';
import {
  LayoutGrid,
  PenTool,
  Box,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  LucideIcon
} from 'lucide-react';
import { processStepsData } from '../../data/siteData';
import { ProcessStep } from '../../types';
import styles from './DesignProcess.module.css';

const iconMap: Record<ProcessStep['iconName'], LucideIcon> = {
  LayoutGrid,
  PenTool,
  Box,
  Sparkles,
};

export const DesignProcess: React.FC = () => {
  const [activeStepId, setActiveStepId] = useState<string>(processStepsData[0].id);

  const activeStep = processStepsData.find((step) => step.id === activeStepId) || processStepsData[0];
  const ActiveIcon = iconMap[activeStep.iconName] || LayoutGrid;

  return (
    <section id="process" className={styles.processSection} aria-label="Interior Design Process & Methodology">
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.badgeWrapper}>
            <span className={styles.badge}>Design Methodology</span>
          </div>
          <h2 className={styles.heading}>
            From Spatial Concept to <span className={styles.highlightText}>Immersive Reality</span>
          </h2>
          <p className={styles.subheading}>
            A structured, precision-driven four-phase workflow engineered to eliminate guesswork,
            validate every detail, and ensure flawless interior execution.
          </p>
        </div>

        {/* 4 Interactive Step Cards */}
        <div className={styles.stepsNav} role="tablist" aria-label="Design Process Stages">
          {processStepsData.map((step, index) => {
            const StepIcon = iconMap[step.iconName] || LayoutGrid;
            const isActive = step.id === activeStepId;

            return (
              <button
                key={step.id}
                type="button"
                role="tab"
                id={`tab-${step.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${step.id}`}
                tabIndex={0}
                className={`${styles.stepCard} ${isActive ? styles.stepCardActive : ''}`}
                onClick={() => setActiveStepId(step.id)}
              >
                <div className={styles.stepCardTop}>
                  <span className={styles.stepNumber}>{step.number}</span>
                  <div className={styles.stepIconWrap} aria-hidden="true">
                    <StepIcon size={20} strokeWidth={1.75} />
                  </div>
                </div>

                <div className={styles.stepCardContent}>
                  <span className={styles.stepPhaseTag}>{step.phase}</span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepSummary}>{step.summary}</p>
                </div>

                <div className={styles.cardBottomIndicator} aria-hidden="true" />
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Spotlight Panel */}
        <div
          id={`panel-${activeStep.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeStep.id}`}
          className={styles.spotlightPanel}
        >
          <div className={styles.spotlightContent}>
            <div className={styles.spotlightHeader}>
              <div className={styles.spotlightBadgeRow}>
                <span className={styles.spotlightPhaseBadge}>
                  <ActiveIcon size={16} strokeWidth={2} aria-hidden="true" />
                  {activeStep.phase}
                </span>
                <span className={styles.stepCounterText}>
                  Stage {activeStep.number} of 04
                </span>
              </div>
              <h3 className={styles.spotlightTitle}>{activeStep.title}</h3>
            </div>

            <p className={styles.spotlightDesc}>{activeStep.description}</p>

            {/* Deliverables Chips */}
            <div className={styles.deliverablesSection}>
              <h4 className={styles.deliverablesLabel}>Key Stage Deliverables:</h4>
              <div className={styles.chipsGrid}>
                {activeStep.deliverables.map((item, idx) => (
                  <span key={idx} className={styles.deliverableChip}>
                    <CheckCircle2 size={15} className={styles.chipCheck} aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Stage Value Benefit Card */}
            <div className={styles.benefitBox}>
              <span className={styles.benefitLabel}>Project Impact:</span>
              <p className={styles.benefitText}>{activeStep.benefit}</p>
            </div>
          </div>

          {/* Interactive Navigation Footprint */}
          <div className={styles.spotlightActions}>
            {processStepsData.map((step, idx) => (
              <button
                key={step.id}
                type="button"
                className={`${styles.indicatorDot} ${step.id === activeStepId ? styles.indicatorDotActive : ''}`}
                onClick={() => setActiveStepId(step.id)}
                aria-label={`Jump to stage ${step.number}: ${step.title}`}
              >
                <span className={styles.dotNumber}>{step.number}</span>
                <span className={styles.dotName}>{step.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

