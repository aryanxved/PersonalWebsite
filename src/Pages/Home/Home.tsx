import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { EnvelopeSimple, Lightbulb, Plus } from '@phosphor-icons/react';
import './Home.css';
import NavBar from '../../Components/NavBar/NavBar';
import { RoundedCard } from '../../Components/Cards/v2/RoundedCard';
import ResumeCard from '../../Components/Cards/v2/ResumeCard';
import { skillMatchClass } from '../../Components/skillFilter';
import { technologies } from '../../data/technologies';
import { projects } from '../../data/projects';
import { experience } from '../../data/experience';
import { links } from '../../data/links';
import { experiencePhrases, pitch, playgroundPhrases } from '../../data/copy';
import { isTodo } from '../../data/types';
import type { Project, Technology } from '../../data/types';
import headshot from '../../Components/Images/Education/headshot.jpg';
import uwLogo from '../../Components/Images/Education/UWLogo.png';

function Home() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const toggleSkill = (name: string) => setActiveSkill((current) => (current === name ? null : name));

  return (
    <>
      <NavBar />
      <main className="background">
        <div className="home-grid">
          <RoundedCard className="area-pitch pitch-card" ariaLabel="Introduction">
            <h1 className="pitch-name">{pitch.name}</h1>
            <p className={`pitch-role${isTodo(pitch.role) ? ' todo-text' : ''}`}>{pitch.role}</p>
            <p className={`pitch-blurb${isTodo(pitch.blurb) ? ' todo-text' : ''}`}>{pitch.blurb}</p>
            <ul className="pitch-meta">
              <li className={isTodo(pitch.location) ? 'todo-text' : undefined}>{pitch.location}</li>
              <li className={isTodo(pitch.availability) ? 'todo-text' : undefined}>{pitch.availability}</li>
              <li>
                {isTodo(links.email) ? (
                  <span className="todo-text">{links.email}</span>
                ) : (
                  <a className="pitch-email" href={`mailto:${links.email}`}>
                    <EnvelopeSimple size={18} aria-hidden />
                    {links.email}
                  </a>
                )}
              </li>
            </ul>
          </RoundedCard>

          <RoundedCard
            className="area-experience"
            glow
            title="EXPERIENCE"
            subtext={<div>Explore my experiences developing <TypingEffect words={experiencePhrases} /></div>}
            externalLink={{ url: links.linkedin, label: 'LinkedIn' }}
          >
            <div className="technology-grid technology-grid-3" role="group" aria-label="Highlight roles and projects by skill">
              {technologies.map((tech) => (
                <TechnologyPill key={tech.name} tech={tech} pressed={activeSkill === tech.name} onToggle={toggleSkill} />
              ))}
            </div>
            <SkillStatus activeSkill={activeSkill} onClear={() => setActiveSkill(null)} />
          </RoundedCard>

          <RoundedCard className="area-headshot photo-card" ariaLabel="Photo of Aryan Ved">
            <img src={headshot} className="profile-picture-full" alt="Portrait of Aryan Ved" />
          </RoundedCard>

          <RoundedCard className="area-crest photo-card" ariaLabel="Education: University of Waterloo">
            <img src={uwLogo} className="profile-picture-full" alt="University of Waterloo crest" />
          </RoundedCard>

          <RoundedCard
            className="area-playground"
            glow
            title="PLAYGROUND"
            subtext={<div>Check out my projects where I <TypingEffect words={playgroundPhrases} /></div>}
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

const TechnologyPill = ({ tech, pressed, onToggle }: TechnologyPillProps) => (
  <button type="button" className="technology-pill is-clickable" aria-pressed={pressed} onClick={() => onToggle(tech.name)}>
    <img src={tech.icon} alt="" />
    <span>{tech.name}</span>
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
      <Plus size={18} weight="bold" className="row-affordance" aria-hidden />
    </Link>
  );
};

const SkillStatus = ({ activeSkill, onClear }: { activeSkill: string | null; onClear: () => void }) => {
  const roles = activeSkill ? experience.filter((job) => job.stack.includes(activeSkill)).length : 0;
  const builds = activeSkill ? projects.filter((project) => project.stack.includes(activeSkill)).length : 0;
  const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

  return (
    <div className="skill-status">
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

const prefersReducedMotion = () =>
  typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const joinPhrases = (words: string[]) =>
  words.length < 2 ? words.join('') : `${words.slice(0, -1).join(', ')}, and ${words[words.length - 1]}`;

/** Animated phrases; screen readers and reduced-motion visitors get the full text instead. */
const TypingEffect = ({ words }: { words: string[] }) => {
  const [reduceMotion] = useState(prefersReducedMotion);
  const fullText = joinPhrases(words);

  if (reduceMotion) return <span>{fullText}</span>;

  return (
    <>
      <span className="visually-hidden">{fullText}</span>
      <AnimatedText words={words} />
    </>
  );
};

const AnimatedText = ({ words }: { words: string[] }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[currentWordIndex];
      if (isDeleting) {
        setDisplayedText(currentWord.substring(0, displayedText.length - 1));
        setTypingSpeed(50);
      } else {
        setDisplayedText(currentWord.substring(0, displayedText.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && displayedText === currentWord) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      }
    };

    const typingTimeout = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(typingTimeout);
  }, [displayedText, isDeleting, typingSpeed, words, currentWordIndex]);

  return (
    <span aria-hidden>
      {displayedText}
      <span className="cursor">|</span>
    </span>
  );
};

export default Home;
