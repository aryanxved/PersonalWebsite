import { Link, useLocation } from 'react-router-dom';
import { Plus } from '@phosphor-icons/react';
import { RoundedCard } from './RoundedCard';
import { experience } from '../../../data/experience';
import { links } from '../../../data/links';
import { skillMatchClass } from '../../skillFilter';

interface ResumeCardProps {
  className?: string;
  activeSkill: string | null;
}

const ResumeCard = ({ className, activeSkill }: ResumeCardProps) => {
  const location = useLocation();

  return (
    <RoundedCard title="RESUME" glow className={className} externalLink={{ url: links.resume, label: 'Resume' }}>
      <ul className="resume-content">
        {experience.map((job) => (
          <li key={job.id}>
            <Link
              to={`/experience/${job.id}`}
              state={{ backgroundLocation: location }}
              className={`resume-row is-clickable${skillMatchClass(job.stack, activeSkill)}`}
            >
              <img src={job.logo} alt="" className="resume-row-logo" />
              <span className="resume-row-text">
                <span className="resume-row-company">{job.company}</span>
                <span className="resume-row-role">{job.role}</span>
              </span>
              <Plus size={18} className="row-affordance" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </RoundedCard>
  );
};

export default ResumeCard;
