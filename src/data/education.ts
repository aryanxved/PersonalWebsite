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
    program: 'TODO: degree and program',
    start: 'TODO: start term',
    end: 'TODO: expected end',
    highlights: ['TODO: coursework, awards or activities'],
    logo: georgiaTechLogo,
    // Same navy as the logo's background, so the wide logo sits seamlessly in the square badge.
    logoBackground: '#003057',
    incoming: true,
  },
  {
    id: 'waterloo',
    school: 'University of Waterloo',
    shortName: 'University of Waterloo',
    program: 'TODO: degree and program',
    start: 'TODO: start year',
    end: 'TODO: grad year',
    highlights: ['TODO: coursework, awards or activities'],
    logo: uwCrest,
  },
  {
    id: 'scitech-north',
    // Name as printed on the program's logo; the image file is named after
    // Chinguacousy, so swap in the school name if you prefer.
    school: 'SciTech North Regional Program',
    shortName: 'SciTech North',
    program: 'TODO: school / program details',
    start: 'TODO: start year',
    end: 'TODO: grad year',
    highlights: ['TODO: coursework, awards or activities'],
    logo: scitechLogo,
  },
];
