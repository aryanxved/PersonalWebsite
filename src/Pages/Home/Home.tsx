import { CSSProperties, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { EnvelopeSimple, Lightbulb, Plus } from '@phosphor-icons/react';
import './Home.css';
import NavBar from '../../Components/NavBar/NavBar';
import { RoundedCard } from '../../Components/Cards/v2/RoundedCard';
import ResumeCard from '../../Components/Cards/v2/ResumeCard';
import { skillMatchClass } from '../../Components/skillFilter';
import { technologies, usesSkill } from '../../data/technologies';
import { projects } from '../../data/projects';
import { experience } from '../../data/experience';
import { links } from '../../data/links';
import { education } from '../../data/education';
import SchoolBadge from '../../Components/SchoolBadge';
import TypingLine from '../../Components/TypingLine/TypingLine';
import { experiencePhrases, pitch, playgroundPhrases } from '../../data/copy';
import { isTodo } from '../../data/types';
import type { Project, Technology } from '../../data/types';
import headshot from '../../Components/Images/Education/headshot.jpg';

function Home() {
  const location = useLocation();
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const toggleSkill = (name: string) => setActiveSkill((current) => (current === name ? null : name));

  return (
    <>
      <NavBar />
      <main className="background">
        <div className="home-grid">
          <RoundedCard
            className="area-experience"
            glow
            title="EXPERIENCE"
            subtext={<TypingLine prefix="Explore my experiences developing" words={experiencePhrases} />}
            externalLink={{ url: links.linkedin, label: 'LinkedIn' }}
          >
            <div className="technology-grid skill-logos" role="group" aria-label="Highlight roles and projects by skill">
              {technologies.map((tech) => (
                <TechnologyPill key={tech.name} tech={tech} pressed={activeSkill === tech.name} onToggle={toggleSkill} />
              ))}
            </div>
            <SkillStatus activeSkill={activeSkill} onClear={() => setActiveSkill(null)} />
          </RoundedCard>

          <RoundedCard className="area-headshot photo-card hero-card" ariaLabel="Introduction">
            <img src={headshot} className="profile-picture-full" alt="Portrait of Aryan Ved" />
            <div className="hero-overlay">
              <h1 className="hero-name">{pitch.name}</h1>
              <Todoable className="hero-role" value={pitch.role} />
              {isTodo(links.email) ? (
                <span className="hero-email todo-text">{links.email}</span>
              ) : (
                <a className="hero-email" href={`mailto:${links.email}`}>
                  <EnvelopeSimple size={16} aria-hidden />
                  Email me
                </a>
              )}
            </div>
          </RoundedCard>

          <RoundedCard className="area-crest education-card" title="EDUCATION">
            <ul className="education-list">
              {education.map((entry) => (
                <li key={entry.id}>
                  <Link
                    to={`/education/${entry.id}`}
                    state={{ backgroundLocation: location }}
                    className="education-item is-clickable"
                  >
                    <SchoolBadge school={entry} />
                    <div className="education-text">
                      <span className="education-school" style={{ '--chars': entry.shortName.length } as CSSProperties}>
                        <span aria-hidden>{entry.shortName}</span>
                        <span className="visually-hidden">{entry.school}</span>
                      </span>
                      <span className="education-years">
                        {entry.incoming && <span className="education-tag">Incoming</span>}
                        <span className="education-dates">
                          <Todoable as="span" value={entry.start} /> – <Todoable as="span" value={entry.end} />
                        </span>
                      </span>
                    </div>
                    <Plus size={16} className="row-affordance" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </RoundedCard>

          <RoundedCard
            className="area-playground"
            glow
            title="PLAYGROUND"
            subtext={<TypingLine prefix="Check out my projects where I" words={playgroundPhrases} />}
            externalLink={{ url: links.github, label: 'GitHub' }}
          >
            <ul className="technology-grid project-grid">
              {projects.map((project) => (
                <li key={project.id}>
                  <ProjectPill project={project} activeSkill={activeSkill} />
                </li>
              ))}
            </ul>
          </RoundedCard>

          <ResumeCard className="area-resume" activeSkill={activeSkill} />
        </div>
      </main>
    </>
  );
}

interface TechnologyPillProps {
  tech: Technology;
  pressed: boolean;
  onToggle: (name: string) => void;
}

const SkillLogo = ({ tech }: { tech: Technology }) => {
  if (tech.image) return <img src={tech.image} alt="" />;
  if (tech.brand) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden focusable="false">
        <path d={tech.brand.path} />
      </svg>
    );
  }
  const Glyph = tech.glyph;
  return Glyph ? <Glyph aria-hidden /> : <span aria-hidden>{tech.name.slice(0, 2)}</span>;
};

const TechnologyPill = ({ tech, pressed, onToggle }: TechnologyPillProps) => (
  <button
    type="button"
    className={`skill-logo is-clickable${tech.image ? ' has-image' : ''}`}
    style={tech.brand?.color ? ({ '--brand': tech.brand.color } as CSSProperties) : undefined}
    aria-label={tech.name}
    aria-pressed={pressed}
    title={tech.name}
    onClick={() => onToggle(tech.name)}
  >
    <SkillLogo tech={tech} />
  </button>
);

const ProjectPill = ({ project, activeSkill }: { project: Project; activeSkill: string | null }) => {
  const location = useLocation();
  return (
    <Link
      to={`/projects/${project.id}`}
      state={{ backgroundLocation: location }}
      className={`technology-pill project-pill is-clickable${skillMatchClass(project.stack, activeSkill)}`}
    >
      {project.icon ? (
        <img src={project.icon} alt="" />
      ) : (
        <span className="pill-icon-fallback" aria-hidden>
          <Lightbulb size={28} />
        </span>
      )}
      <span>{project.title}</span>
      <Plus size={16} className="row-affordance" aria-hidden />
    </Link>
  );
};

const SkillStatus = ({ activeSkill, onClear }: { activeSkill: string | null; onClear: () => void }) => {
  const roles = activeSkill ? experience.filter((job) => usesSkill(job.stack, activeSkill)).length : 0;
  const builds = activeSkill ? projects.filter((project) => usesSkill(project.stack, activeSkill)).length : 0;
  const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

  return (
    <div className={`skill-status${activeSkill ? ' is-active' : ''}`}>
      <span aria-live="polite">
        {activeSkill && `${activeSkill}: ${plural(roles, 'role')} and ${plural(builds, 'project')} highlighted.`}
      </span>
      {activeSkill && (
        <button type="button" className="skill-status-clear" onClick={onClear}>
          Clear
        </button>
      )}
    </div>
  );
};

const Todoable = ({ value, className = '', as: Tag = 'p' }: { value: string; className?: string; as?: 'p' | 'span' }) => (
  <Tag className={`${className}${isTodo(value) ? ' todo-text' : ''}`.trim() || undefined}>{value}</Tag>
);

export default Home;
