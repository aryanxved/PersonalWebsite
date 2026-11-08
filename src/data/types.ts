export interface Experience {
  /** URL slug, used in /experience/:id */
  id: string;
  company: string;
  role: string;
  logo: string;
  start: string;
  end: string;
  location: string;
  /** One line with a measurable result, shown on the resume row. */
  summary: string;
  highlights: string[];
  /** Technology names; must match `Technology.name` to work with the skill filter. */
  stack: string[];
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  /** URL slug, used in /projects/:id */
  id: string;
  title: string;
  /** Optional: projects without an icon fall back to a generic one. */
  icon?: string;
  summary: string;
  problem: string;
  role: string;
  /** Technology names; must match `Technology.name` to work with the skill filter. */
  stack: string[];
  result: string;
  screenshots: string[];
  links: ProjectLink[];
}

export interface Technology {
  name: string;
  icon: string;
}

/** Placeholder marker. Search the codebase for "TODO:" to find content to fill in. */
export const isTodo = (value: string) => value.startsWith('TODO:');
