import type { Education } from './types';
import uwCrest from '../Components/Images/Education/UWLogo.png';
import scitechLogo from '../Components/Images/Education/Chinguacousy.jpg';
import georgiaTechLogo from '../Components/Images/Education/GeorgiaTech.png';

// Most recent first.
export const education: Education[] = [
  {
    id: 'georgia-tech',
    school: 'Georgia Institute of Technology',
    shortName: 'Georgia Tech',
    program: 'Master of Computer Science',
    start: 'Jan 2027',
    end: 'Present',
    highlights: ["Nothing here yet. The highlights start with my first courses, so come along for the journey!"],
    logo: georgiaTechLogo,
    // Same navy as the logo's background, so the wide logo sits seamlessly in the square badge.
    logoBackground: '#003057',
    incoming: true,
  },
  {
    id: 'waterloo',
    school: 'University of Waterloo',
    shortName: 'University of Waterloo',
    program: 'Bachelor of Applied Science, Honours Management Engineering, Co-operative Program, Computing Option',
    start: 'Sep 2020',
    end: 'Jun 2025',
    highlights: ['Graduated with Distinction'],
    initiatives: [
      'Vice-President of Technology @ UW FinTech',
      'Vice-President of Development @ FARMSA (Financial Risk Association)',
    ],
    courses: [
      'Software Design & Architectures',
      'Simulations',
      'User Interfaces',
      'Machine Learning',
      'HCI',
      'Data Structures',
      'Decision Support Systems',
    ],
    logo: uwCrest,
  },
  {
    id: 'scitech-north',
    // Name as printed on the program's logo; the school itself is named in `program`.
    school: 'SciTech North Regional Program',
    shortName: 'SciTech North',
    program: 'Ontario Secondary School Diploma, SciTech Regional Program at Chinguacousy Secondary School',
    start: '2016',
    end: '2020',
    highlights: [
      'Ontario Scholar (Honours)',
      'Gold Medalist in the FIRST Robotics Competition',
      'Specialist High Skills Major in Manufacturing Engineering',
    ],
    initiatives: [
      'President of the SkyTech Club',
      'Executive Treasurer of the Athletic Council',
      'CodeSpot computer science club and the Tech, Science and Innovation club',
      'PicoCTF coding competition and the WolfHacks 14-hour hackathon',
    ],
    logo: scitechLogo,
  },
];
