import type { Education } from '../data/types';

/** A school's logo (or monogram) on a rounded square badge. Decorative: the school name is always shown next to it. */
const SchoolBadge = ({ school, className = '' }: { school: Education; className?: string }) =>
  school.logo ? (
    <img
      src={school.logo}
      className={`education-badge ${className}`}
      style={school.logoBackground ? { background: school.logoBackground } : undefined}
      alt=""
    />
  ) : (
    <span
      className={`education-badge education-monogram ${className}`}
      style={{ color: school.monogram?.color, background: school.monogram?.background }}
      aria-hidden
    >
      {school.monogram?.text}
    </span>
  );

export default SchoolBadge;
