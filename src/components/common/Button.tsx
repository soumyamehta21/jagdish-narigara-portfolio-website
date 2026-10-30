import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'outline' | 'solid';
  iconType?: 'arrow-right' | 'arrow-up-right' | 'none';
  onClick?: () => void;
  className?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  href,
  variant = 'outline',
  iconType = 'arrow-right',
  onClick,
  className = '',
  target,
  rel,
  ariaLabel,
}) => {
  const combinedClassName = `${styles.btn} ${styles[variant]} ${className}`.trim();

  const renderIcon = () => {
    if (iconType === 'arrow-right') {
      return <ArrowRight className={styles.icon} size={18} aria-hidden="true" />;
    }
    if (iconType === 'arrow-up-right') {
      return <ArrowUpRight className={styles.icon} size={18} aria-hidden="true" />;
    }
    return null;
  };

  if (href) {
    return (
      <a
        href={href}
        className={combinedClassName}
        onClick={onClick}
        target={target}
        rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
        aria-label={ariaLabel}
      >
        <span>{children}</span>
        {renderIcon()}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={combinedClassName}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <span>{children}</span>
      {renderIcon()}
    </button>
  );
};
