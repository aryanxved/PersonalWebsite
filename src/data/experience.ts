import type { Experience } from './types';
import equitable from '../Components/Images/Experience/Equitable.png';
import relay from '../Components/Images/Experience/Relay.jpeg';
import shoplogix from '../Components/Images/Experience/Shoplogix.jpeg';
import rbc from '../Components/Images/Experience/RBC.png';
import manulife from '../Components/Images/Experience/Manulife.png';
import estee from '../Components/Images/Experience/Estee.jpg';
import ehToZed from '../Components/Images/Experience/PreschoolCanada.jpeg';

// Only company, role and logo come from the current site. Every other field
// is a TODO placeholder: no dates, metrics or tech stacks have been invented.
// `stack` drives the skill filter, so roles stay unmatched until it is filled.
const todo = (company: string): Pick<Experience, 'start' | 'end' | 'location' | 'summary' | 'highlights' | 'stack'> => ({
  start: 'TODO: start date',
  end: 'TODO: end date',
  location: 'TODO: location',
  summary: `TODO: one-line result at ${company} (with a number)`,
  highlights: ['TODO: highlight 1', 'TODO: highlight 2'],
  stack: [],
});

export const experience: Experience[] = [
  {
    id: 'equitable',
    company: 'Equitable Life of Canada',
    role: 'Intermediate Business Systems Analyst',
    logo: equitable,
    ...todo('Equitable Life'),
  },
  {
    id: 'relay',
    company: 'Relay Financial Technologies',
    role: 'Full Stack Engineer Intern',
    logo: relay,
    ...todo('Relay'),
  },
  {
    id: 'shoplogix',
    company: 'Shoplogix',
    role: 'Software Developer Intern',
    logo: shoplogix,
    ...todo('Shoplogix'),
  },
  {
    id: 'rbc',
    company: 'Royal Bank of Canada',
    role: 'Application Developer Intern',
    logo: rbc,
    ...todo('RBC'),
  },
  {
    id: 'manulife',
    company: 'Manulife Financial Corporation',
    role: 'Software Developer Intern',
    logo: manulife,
    ...todo('Manulife'),
  },
  {
    id: 'estee-lauder',
    company: 'The Estee Lauder Companies',
    role: 'Augmented Reality Developer Intern',
    logo: estee,
    ...todo('Estee Lauder'),
  },
  {
    id: 'eh-to-zed',
    company: 'Eh to Zed Preschool Canada',
    role: 'Junior Virtual Reality Designer Intern',
    logo: ehToZed,
    ...todo('Eh to Zed'),
  },
];
