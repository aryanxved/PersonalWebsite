/** Class to add to a role or project for the active tech-pill filter. */
export const skillMatchClass = (stack: string[], activeSkill: string | null) => {
  if (!activeSkill) return '';
  return stack.includes(activeSkill) ? ' is-match' : ' is-dimmed';
};
