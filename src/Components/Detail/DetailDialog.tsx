import { CSSProperties, PointerEvent, ReactNode, useEffect, useId, useRef } from 'react';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ArrowSquareOut, CaretLeft, CaretRight, Lightbulb, X } from '@phosphor-icons/react';
import { experience } from '../../data/experience';
import { projects } from '../../data/projects';
import { education } from '../../data/education';
import SchoolBadge from '../SchoolBadge';
import { isTodo } from '../../data/types';
import type { BrandColors } from '../../data/types';
import type { DetailLocationState } from '../../App';
import './Detail.css';

interface Entry {
  id: string;
}

interface DetailShellProps<T extends Entry> {
  items: T[];
  basePath: string;
  /** Short name for prev/next labels. */
  label: (item: T) => string;
  title: (item: T) => string;
  header: (item: T, titleId: string) => ReactNode;
  body: (item: T) => ReactNode;
  /** Optional per-entry brand colors that theme the popup. */
  brand?: (item: T) => BrandColors | undefined;
  /** Small logo for an entry, shown on the previous/next cards. */
  thumb?: (item: T) => ReactNode;
  /**
   * The list is a timeline stored newest first. Previous then steps back in
   * time (to the older entry) and Next steps forward (to the newer one).
   */
  timeline?: boolean;
}

const prefersReducedMotion = () =>
  typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * A brand-coloured glow that follows the mouse inside the popup.
 *
 * The glow is its own small layer moved with transform (GPU-composited, so
 * nothing repaints), and each frame it eases a fraction of the way toward
 * the cursor. That keeps it attached to the pointer but soft, without the
 * lag of a CSS transition. It fades in on enter and out on leave; the static
 * glow at the top of the sheet remains underneath.
 */
const FOLLOW_EASE = 0.22; // share of the remaining distance covered per frame

const useGlowFollow = () => {
  const glowRef = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const placed = useRef(false);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const render = () => {
    const glow = glowRef.current;
    if (!glow) return;
    const c = current.current;
    const t = target.current;
    c.x += (t.x - c.x) * FOLLOW_EASE;
    c.y += (t.y - c.y) * FOLLOW_EASE;
    glow.style.transform = `translate3d(${c.x.toFixed(1)}px, ${c.y.toFixed(1)}px, 0)`;
    // Keep animating until the glow has caught up with the cursor.
    if (Math.abs(t.x - c.x) > 0.3 || Math.abs(t.y - c.y) > 0.3) {
      frame.current = requestAnimationFrame(render);
    } else {
      frame.current = 0;
    }
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    // Mouse only (touch has no hover); a missing type is treated as a mouse.
    if ((event.pointerType && event.pointerType !== 'mouse') || prefersReducedMotion()) return;
    const box = event.currentTarget.getBoundingClientRect();
    target.current = { x: event.clientX - box.left, y: event.clientY - box.top };
    if (!placed.current) {
      // First move: start exactly under the cursor rather than flying in.
      current.current = { ...target.current };
      placed.current = true;
    }
    glowRef.current?.classList.add('is-active');
    if (!frame.current) frame.current = requestAnimationFrame(render);
  };

  const onPointerLeave = () => {
    glowRef.current?.classList.remove('is-active');
    placed.current = false;
  };

  return { glowRef, handlers: { onPointerMove, onPointerLeave } };
};

/** CSS variables for a branded popup; Detail.css derives readable shades from them. */
const brandStyle = (colors?: BrandColors): CSSProperties | undefined =>
  colors
    ? ({
        '--brand-primary': colors.primary,
        '--brand-secondary': colors.secondary ?? colors.primary,
      } as CSSProperties)
    : undefined;

function DetailShell<T extends Entry>({ items, basePath, label, title, header, body, brand, thumb, timeline = false }: DetailShellProps<T>) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const titleId = useId();
  const fullScreen = useMediaQuery('(max-width: 640px)');
  const glow = useGlowFollow();
  const state = location.state as DetailLocationState | null;

  const index = items.findIndex((item) => item.id === id);
  const item = index >= 0 ? items[index] : undefined;

  useEffect(() => {
    if (!item) return;
    const previous = document.title;
    document.title = `${title(item)} · Aryan Ved`;
    return () => {
      document.title = previous;
    };
  }, [item, title]);

  if (!item) return <Navigate to="/" replace />;

  // Opened from the grid: go back so the back button and history stay in sync.
  // Direct visit: there is nothing to go back to on this site, so replace with Home.
  const close = () => (state?.backgroundLocation ? navigate(-1) : navigate('/', { replace: true }));

  const earlierInList = index > 0 ? items[index - 1] : undefined;
  const laterInList = index < items.length - 1 ? items[index + 1] : undefined;
  // Timelines are stored newest first, so "previous" (older) is later in the list.
  const prev = timeline ? laterInList : earlierInList;
  const next = timeline ? earlierInList : laterInList;

  return (
    <Dialog
      open
      onClose={close}
      fullScreen={fullScreen}
      scroll="paper"
      maxWidth="md"
      fullWidth
      aria-labelledby={titleId}
      className={brand?.(item) ? 'is-branded' : undefined}
      style={brandStyle(brand?.(item))}
      PaperProps={{ className: 'detail-paper', ...(brand?.(item) ? glow.handlers : {}) }}
      BackdropProps={{ className: 'detail-backdrop' }}
    >
      {brand?.(item) && <span ref={glow.glowRef} className="detail-follow-glow" aria-hidden />}
      <div className="detail-top">
        {header(item, titleId)}
        <button type="button" className="detail-icon-button" aria-label="Close" onClick={close}>
          <X size={24} aria-hidden />
        </button>
      </div>

      <div className="detail-body">{body(item)}</div>

      <nav className="detail-nav" aria-label="More entries">
        {/* replace: prev/next swaps the entry in place, so one close/back still returns to Home. */}
        {prev ? (
          <NavCard direction="prev" to={`${basePath}/${prev.id}`} state={state} name={label(prev)} logo={thumb?.(prev)} brand={brand?.(prev)} />
        ) : (
          <span />
        )}
        {next ? (
          <NavCard direction="next" to={`${basePath}/${next.id}`} state={state} name={label(next)} logo={thumb?.(next)} brand={brand?.(next)} />
        ) : (
          <span />
        )}
      </nav>
    </Dialog>
  );
}

interface NavCardProps {
  direction: 'prev' | 'next';
  to: string;
  state: DetailLocationState | null;
  name: string;
  logo?: ReactNode;
  brand?: BrandColors;
}

/** Previous/next card: logo, a small label and the entry's name. */
const NavCard = ({ direction, to, state, name, logo, brand }: NavCardProps) => {
  const Caret = direction === 'prev' ? CaretLeft : CaretRight;
  return (
    <Link
      className={`detail-nav-link detail-nav-card is-${direction}`}
      to={to}
      replace
      state={state}
      style={brand ? ({ '--nav-brand': brand.primary } as CSSProperties) : undefined}
    >
      <Caret className="detail-nav-caret" size={16} weight="bold" aria-hidden />
      {logo && (
        <span className="detail-nav-thumb" aria-hidden>
          {logo}
        </span>
      )}
      <span className="detail-nav-text">
        <span className="detail-nav-hint">{direction === 'prev' ? 'Previous' : 'Next'}</span>{' '}
        <span className="detail-nav-name">{name}</span>
      </span>
    </Link>
  );
};

/** Renders a value, styling "TODO:" placeholders so they are easy to spot. */
const Text = ({ value, as: Tag = 'span' }: { value: string; as?: 'span' | 'p' }) => (
  <Tag className={isTodo(value) ? 'todo-text' : undefined}>{value}</Tag>
);

const Section = ({ heading, children }: { heading: string; children: ReactNode }) => (
  <section className="detail-section">
    <h3>{heading}</h3>
    {children}
  </section>
);

const Stack = ({ stack }: { stack: string[] }) =>
  stack.length ? (
    <ul className="detail-chips">
      {stack.map((tech) => (
        <li key={tech}>{tech}</li>
      ))}
    </ul>
  ) : (
    <Text as="p" value="TODO: add the tech stack" />
  );

export const ExperienceDialog = () => (
  <DetailShell
    items={experience}
    basePath="/experience"
    timeline
    brand={(job) => job.brand}
    label={(job) => job.company}
    thumb={(job) => <img src={job.logo} alt="" />}
    title={(job) => `${job.role}, ${job.company}`}
    header={(job, titleId) => (
      <div className="detail-heading">
        <img src={job.logo} alt="" className="detail-logo" />
        <div>
          <h2 id={titleId}>{job.role}</h2>
          <p className="detail-meta">
            {job.company} · <Text value={job.start} /> – <Text value={job.end} /> · <Text value={job.location} />
          </p>
        </div>
      </div>
    )}
    body={(job) => (
      <>
        <Text as="p" value={job.summary} />
        <Section heading="Highlights">
          <ul className="detail-list">
            {job.highlights.map((highlight) => (
              <li key={highlight}>
                <Text value={highlight} />
              </li>
            ))}
          </ul>
        </Section>
        <Section heading="Stack">
          <Stack stack={job.stack} />
        </Section>
      </>
    )}
  />
);

export const ProjectDialog = () => (
  <DetailShell
    items={projects}
    basePath="/projects"
    label={(project) => project.title}
    thumb={(project) => (project.icon ? <img src={project.icon} alt="" /> : <Lightbulb size={20} />)}
    title={(project) => project.title}
    header={(project, titleId) => (
      <div className="detail-heading">
        {project.icon && <img src={project.icon} alt="" className="detail-logo" />}
        <div>
          <h2 id={titleId}>
            <Text value={project.title} />
          </h2>
          <Text as="p" value={project.summary} />
        </div>
      </div>
    )}
    body={(project) => (
      <>
        <Section heading="The problem">
          <Text as="p" value={project.problem} />
        </Section>
        <Section heading="My role">
          <Text as="p" value={project.role} />
        </Section>
        <Section heading="Result">
          <Text as="p" value={project.result} />
        </Section>
        <Section heading="Stack">
          <Stack stack={project.stack} />
        </Section>
        <Section heading="Screenshots">
          {project.screenshots.length ? (
            <div className="detail-screenshots">
              {project.screenshots.map((src, i) => (
                <img key={src} src={src} alt={`${project.title} screenshot ${i + 1}`} loading="lazy" />
              ))}
            </div>
          ) : (
            <Text as="p" value="TODO: add screenshots" />
          )}
        </Section>
        <Section heading="Links">
          {project.links.length ? (
            <ul className="detail-links">
              {project.links.map((link) => (
                <li key={link.url}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label}
                    <ArrowSquareOut size={16} aria-hidden />
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <Text as="p" value="TODO: add links (GitHub, demo, App Store…)" />
          )}
        </Section>
      </>
    )}
  />
);

export const EducationDialog = () => (
  <DetailShell
    items={education}
    basePath="/education"
    timeline
    label={(school) => school.shortName}
    thumb={(school) => <SchoolBadge school={school} />}
    title={(school) => school.school}
    header={(school, titleId) => (
      <div className="detail-heading">
        <SchoolBadge school={school} className="detail-school-badge" />
        <div>
          <h2 id={titleId}>{school.school}</h2>
          <p className="detail-meta">
            {school.incoming && <span className="education-tag">Incoming</span>}{' '}
            <Text value={school.start} /> – <Text value={school.end} />
          </p>
        </div>
      </div>
    )}
    body={(school) => (
      <>
        <Section heading="Program">
          <Text as="p" value={school.program} />
        </Section>
        <Section heading="Highlights">
          <ul className="detail-list">
            {school.highlights.map((highlight) => (
              <li key={highlight}>
                <Text value={highlight} />
              </li>
            ))}
          </ul>
        </Section>
      </>
    )}
  />
);
