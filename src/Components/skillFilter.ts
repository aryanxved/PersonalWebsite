import { usesSkill } from '../data/technologies';

/** Class to add to a role or project for the active tech-pill filter. */
export const skillMatchClass = (stack: string[], activeSkill: string | null) => {
  if (!activeSkill) return '';
  return usesSkill(stack, activeSkill) ? ' is-match' : ' is-dimmed';
};
