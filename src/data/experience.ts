import type { Experience } from './types';
import equitable from '../Components/Images/Experience/Equitable.png';
import relay from '../Components/Images/Experience/Relay.jpeg';
import shoplogix from '../Components/Images/Experience/Shoplogix.jpeg';
import rbc from '../Components/Images/Experience/RBC.png';
import manulife from '../Components/Images/Experience/Manulife.png';
import estee from '../Components/Images/Experience/Estee.jpg';
import ehToZed from '../Components/Images/Experience/PreschoolCanada.jpeg';

// From Aryan's resume. `summary` is the one-line result on each resume row;
// `highlights` are the full resume points shown in the popup.
// `stack` drives the skill filter, so names must match technologies.ts
// (C#, JavaScript, TypeScript, Kotlin, React, React Native) to be highlighted.
export const experience: Experience[] = [
  {
    id: 'equitable',
    company: 'Equitable Life of Canada',
    role: 'Intermediate Business Systems Analyst',
    logo: equitable,
    start: 'Jun 2025',
    end: 'Present',
    location: 'Waterloo',
    summary: 'Shipped OnBase workflow enhancements for 10+ divisions and 40+ process queues',
    highlights: [
      'Shipped cross-divisional OnBase workflow enhancements, enabling reliable releases for 10+ divisions and 40+ process queues',
      'Authored technical system specifications defining business logic, data flows and tradeoffs reducing rework for implementation',
      'Protected production releases by validating system behavior and edge cases via API validation, QAT/UAT & post-release checks',
      'Leveraged Copilot to accelerate discovery sessions with stakeholders, triage requests and analyze SQL/C#/.NET system code',
    ],
    stack: ['OnBase', 'C#', '.NET', 'SQL', 'Copilot'],
  },
  {
    id: 'relay',
    company: 'Relay Financial Technologies',
    role: 'Software Engineering Intern (Full Stack)',
    logo: relay,
    start: 'Sep 2024',
    end: 'Dec 2024',
    location: 'Toronto',
    summary: 'Revamped the registration flow, raising account funding and completion KPIs by 28%',
    highlights: [
      'Revamped registration flow using React/Typescript/AWS Lambda increasing account funding and completion rate KPIs by 28%',
      'Implemented conditional testing for pull requests using Jest, Cypress & GitHub Actions reducing test execution time by 80%',
      'Leveraged Cursor AI to build reusable components in the new Design System, streamlining development for over 5 teams',
      'Coordinated software releases to production, managing builds and Jira tickets for efficient rollouts and fast post-launch triage',
    ],
    stack: ['React', 'TypeScript', 'AWS Lambda', 'Jest', 'Cypress', 'GitHub Actions', 'Cursor'],
  },
  {
    id: 'shoplogix',
    company: 'Shoplogix',
    role: 'Software Developer Intern',
    logo: shoplogix,
    start: 'Jan 2024',
    end: 'Apr 2024',
    location: 'Oakville',
    summary: 'Delivered 22+ bugfix tickets across the core product, including critical production alerts',
    highlights: [
      'Delivered 22+ crucial bugfix tickets on Jira across the core product affecting critical production alerts and AWS CloudWatch logs',
      'Developed highly requested module allowing custom departments for clients using C#.Net, React, PostgreSQL, Jest, NUnit',
      'Optimized the manufacturing efficiency for clients by gathering insights using KPIs like OEE to improve production productivity',
    ],
    stack: ['C#', '.NET', 'React', 'PostgreSQL', 'Jest', 'NUnit', 'AWS CloudWatch'],
  },
  {
    id: 'rbc',
    company: 'Royal Bank of Canada',
    role: 'Application Developer Intern',
    logo: rbc,
    start: 'May 2023',
    end: 'Aug 2023',
    location: 'Toronto',
    summary: 'Implemented core features for 2,000 small business users on a C# WPF application',
    highlights: [
      'Automated manual collateral securities form processes with a digital portal using C# .Net, Angular, Typescript & SQL Server',
      'Developed wire transfer tool for branch managers, volume tested sending 500+ automatic information based emails per day',
      'Implemented core features affecting 2000 small business users on C# WPF application deployed using custom Jenkins pipeline',
    ],
    stack: ['C#', '.NET', 'Angular', 'TypeScript', 'SQL Server', 'WPF', 'Jenkins'],
  },
  {
    id: 'manulife',
    company: 'Manulife Financial Corporation',
    role: 'Software Developer Intern',
    logo: manulife,
    start: 'Sep 2022',
    end: 'Dec 2022',
    location: 'Waterloo',
    summary: 'Led the migration of 75 repositories from TFS to GitHub',
    highlights: [
      "Spearheaded critical migration from existing source control system using TFS to GitHub Team's containing 75 repositories",
      'Developed a C# .Net application connected to SQL Server database to automate processes for certified annuity specialists',
      "Worked through the Agile Software Development cycle, completing various Jira stories and supporting daily scrum's/retro's",
    ],
    stack: ['C#', '.NET', 'SQL Server', 'GitHub', 'TFS'],
  },
  {
    id: 'estee-lauder',
    company: 'The Estee Lauder Companies',
    role: 'Augmented Reality Developer Intern',
    logo: estee,
    start: 'Jan 2022',
    end: 'Apr 2022',
    location: 'Toronto',
    summary: 'Built an AR experience in Unity with live REST data from 30 machines',
    highlights: [
      'Created AR experience in C#/Unity with live REST data from 30 machines; dashboard to convert Excel to SQL using .NET Core',
      'Led AR initiative through discovery sessions, prototyping design in Figma and automating workflows with Power Automate/BI',
    ],
    stack: ['C#', 'Unity', '.NET Core', 'SQL', 'Figma', 'Power Automate', 'Power BI'],
  },
  {
    id: 'eh-to-zed',
    company: 'Eh to Zed Preschool Canada',
    role: 'Virtual Reality Designer Intern',
    logo: ehToZed,
    start: 'May 2021',
    end: 'Aug 2021',
    location: 'Aurora',
    summary: 'Worked on a VR educational game to assist children with autism',
    highlights: [
      'Worked on an educational game to assist children with autism using C# scripts, Unity engine and Oculus Quest 2 VR device',
    ],
    stack: ['C#', 'Unity', 'Oculus Quest 2'],
  },
];
