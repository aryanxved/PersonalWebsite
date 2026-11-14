import type { Project } from './types';
import react from '../Components/Images/Icons/react.png';
import onepoint from '../Components/Images/Icons/onepoint.png';
import flickpick from '../Components/Images/Icons/flickpick.png';
import figma from '../Components/Images/Icons/figma.png';

// Titles and icons come from the current site. Stacks are filled only where
// they can be checked against code (this repo, and the 1Point repos, which are
// Expo / React Native apps). Everything else is a TODO placeholder.
const todoDetails = {
  summary: 'TODO: one-line summary',
  problem: 'TODO: the problem this solves',
  role: 'TODO: your role',
  result: 'TODO: the outcome (with a number if possible)',
  screenshots: [] as string[], // TODO: add screenshot imports
  links: [] as Project['links'], // TODO: add links, e.g. { label: 'GitHub', url: '...' }
};

export const projects: Project[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    icon: react,
    ...todoDetails,
    stack: ['React', 'TypeScript'],
  },
  {
    id: 'onepoint-loyalty',
    title: '1Point Loyalty Platform',
    icon: onepoint,
    ...todoDetails,
    stack: ['React Native', 'TypeScript'],
  },
  {
    id: 'flickpick',
    title: 'FlickPick Movie App',
    icon: flickpick,
    ...todoDetails,
    stack: [], // TODO: FlickPick stack
  },
  {
    id: 'figma-ui-designs',
    title: 'Figma UI Designs',
    icon: figma,
    ...todoDetails,
    stack: ['Figma'],
  },
  {
    id: 'temperature-glove',
    title: 'Temperature-Sensing Glove',
    ...todoDetails,
    stack: [], // TODO: glove stack
  },
  {
    id: 'the-hungry-warrior',
    title: 'The Hungry Warrior',
    ...todoDetails,
    stack: [], // TODO: tools used
  },
];
