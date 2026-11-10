import { ReactNode, useId } from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';
import './RoundedCard.css';

interface RoundedCardProps {
  title?: string;
  subtext?: ReactNode;
  /** External link shown as its own icon button, separate from anything clickable inside the card. */
  externalLink?: { url: string; label: string };
  glow?: boolean;
  className?: string;
  /** Accessible name for cards without a visible title (e.g. the photo cards). */
  ariaLabel?: string;
  children?: ReactNode;
}

export const RoundedCard = ({ title, subtext, externalLink, glow = false, className = '', ariaLabel, children }: RoundedCardProps) => {
  const titleId = useId();

  return (
    <section
      className={`rounded-card${glow ? ' rounded-card-glow' : ''} ${className}`}
      aria-labelledby={title ? titleId : undefined}
      aria-label={title ? undefined : ariaLabel}
    >
      <div className="card-content">
        {(title || externalLink) && (
          <div className="card-header">
            {title && <h2 id={titleId} className="card-text">{title}</h2>}
            {externalLink && (
              <a
                className="card-external-link"
                href={externalLink.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${externalLink.label} (opens in a new tab)`}
                title={externalLink.label}
              >
                <ArrowUpRight size={22} weight="bold" aria-hidden />
              </a>
            )}
          </div>
        )}
        {subtext && <div className="card-sub-text">{subtext}</div>}
        {children}
      </div>
    </section>
  );
};
