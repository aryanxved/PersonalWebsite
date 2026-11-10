import { ReactNode, useEffect, useId } from 'react';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ArrowSquareOut, CaretLeft, CaretRight, X } from '@phosphor-icons/react';
import { experience } from '../../data/experience';
import { projects } from '../../data/projects';
import { education } from '../../data/education';
import SchoolBadge from '../SchoolBadge';
import { isTodo } from '../../data/types';
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
}

function DetailShell<T extends Entry>({ items, basePath, label, title, header, body }: DetailShellProps<T>) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const titleId = useId();
  const fullScreen = useMediaQuery('(max-width: 640px)');
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

  const prev = index > 0 ? items[index - 1] : undefined;
  const next = index < items.length - 1 ? items[index + 1] : undefined;

  return (
    <Dialog
      open
      onClose={close}
      fullScreen={fullScreen}
      scroll="paper"
      maxWidth="md"
      fullWidth
      aria-labelledby={titleId}
      PaperProps={{ className: 'detail-paper' }}
      BackdropProps={{ className: 'detail-backdrop' }}
    >
      <div className="detail-top">
        {header(item, titleId)}
        <button type="button" className="detail-icon-button" aria-label="Close" onClick={close}>
          <X size={24} aria-hidden />
        </button>
      </div>

      <div className="detail-body">{body(item)}</div>

      <nav className="detail-nav" aria-label="More entries">
        {prev ? (
          // replace: prev/next swaps the entry in place, so one close/back still returns to Home.
          <Link className="detail-nav-link" to={`${basePath}/${prev.id}`} replace state={state}>
            <CaretLeft size={18} aria-hidden />
            <span>
              <span className="detail-nav-hint">Previous</span>
              {label(prev)}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link className="detail-nav-link detail-nav-next" to={`${basePath}/${next.id}`} replace state={state}>
            <span>
              <span className="detail-nav-hint">Next</span>
              {label(next)}
            </span>
            <CaretRight size={18} aria-hidden />
          </Link>
        )}
      </nav>
    </Dialog>
  );
}

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
    label={(job) => job.company}
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
    label={(school) => school.shortName}
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
