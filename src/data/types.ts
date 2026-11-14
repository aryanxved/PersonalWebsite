import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import type { BrandIcon } from './brandIcons';

/** Colors sampled from a company's logo, used to theme its popup. */
export interface BrandColors {
  primary: string;
  /** A second logo color, used as the accent in dark mode when present. */
  secondary?: string;
}

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
  brand: BrandColors;
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

export interface Education {
  /** URL slug, for a future /education/:id popup. */
  id: string;
  /** Full official name (used for alt text, screen readers and the future popup). */
  school: string;
  /** Short name that fits on one line in the pill. */
  shortName: string;
  program: string;
  start: string;
  end: string;
  /** Shown in the popup: coursework, awards, clubs, etc. */
  highlights: string[];
  /** Square logo; without one, `monogram` is shown on a colored badge. */
  logo?: string;
  /** Badge fill behind the logo, for logos that are not square (defaults to white). */
  logoBackground?: string;
  monogram?: { text: string; color: string; background: string };
  /** Shows an "Incoming" tag. */
  incoming?: boolean;
}

export interface Technology {
  name: string;
  /** One of: a logo image file, a Simple Icons brand logo, or (when no brand
   *  logo is available) a Phosphor symbol. */
  image?: string;
  brand?: BrandIcon;
  glyph?: PhosphorIcon;
  /** Stack entries this skill covers (defaults to just `name`). */
  matches?: string[];
}

/** Placeholder marker. Search the codebase for "TODO:" to find content to fill in. */
export const isTodo = (value: string) => value.startsWith('TODO:');
