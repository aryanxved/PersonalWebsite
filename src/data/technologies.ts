import { ChartBar, Cloud, Database, TreeStructure } from '@phosphor-icons/react';
import type { Technology } from './types';
import * as brands from './brandIcons';
import csharp from '../Components/Images/Icons/C_Sharp.svg.png';
import javascript from '../Components/Images/Icons/Javascript.png';
import typescript from '../Components/Images/Icons/Typescript.png';
import kotlin from '../Components/Images/Icons/kotlin.png';
import react from '../Components/Images/Icons/react.png';
import reactNative from '../Components/Images/Icons/reactnative.jpeg';
import figma from '../Components/Images/Icons/figma.png';

// Skill filter logos. Names must match the `stack` entries in experience.ts
// and projects.ts, or list them in `matches`.
// SQL Server, AWS, Power BI and OnBase have no logo in Simple Icons (their
// owners asked for removal), so they use a plain symbol instead.
export const technologies: Technology[] = [
  { name: 'C#', image: csharp },
  { name: '.NET', brand: brands.dotNet, matches: ['.NET', '.NET Core', 'WPF'] },
  { name: 'TypeScript', image: typescript },
  { name: 'JavaScript', image: javascript },
  { name: 'React', image: react },
  { name: 'React Native', image: reactNative },
  { name: 'Angular', brand: brands.angular },
  { name: 'SQL', glyph: Database, matches: ['SQL', 'SQL Server'] },
  { name: 'PostgreSQL', brand: brands.postgresql },
  { name: 'AWS', glyph: Cloud, matches: ['AWS Lambda', 'AWS CloudWatch'] },
  { name: 'Jest', brand: brands.jestIcon },
  { name: 'Cypress', brand: brands.cypress },
  { name: 'GitHub Actions', brand: brands.githubActions },
  { name: 'Jenkins', brand: brands.jenkins },
  { name: 'GitHub', brand: brands.github, matches: ['GitHub', 'TFS'] },
  { name: 'Unity', brand: brands.unity },
  { name: 'Oculus', brand: brands.oculus, matches: ['Oculus Quest 2'] },
  { name: 'Figma', image: figma },
  { name: 'Power BI', glyph: ChartBar, matches: ['Power BI', 'Power Automate'] },
  { name: 'GitHub Copilot', brand: brands.githubCopilot, matches: ['Copilot'] },
  { name: 'Cursor', brand: brands.cursor },
  { name: 'OnBase', glyph: TreeStructure },
  { name: 'Kotlin', image: kotlin },
];

/** Whether a role or project's stack uses the named skill. */
export const usesSkill = (stack: string[], skillName: string) => {
  const skill = technologies.find((tech) => tech.name === skillName);
  const covers = skill?.matches ?? [skillName];
  return stack.some((entry) => covers.includes(entry));
};
