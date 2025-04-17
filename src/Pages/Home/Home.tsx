import React, { useEffect, useState } from 'react';
import {Card, CardActions, CardContent, Grid, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormLabel, RadioGroup, FormControlLabel, FormHelperText, CssBaseline, useMediaQuery} from "@material-ui/core/";
import './Home.css';
import NavBar from '../../Components/NavBar/NavBar';
import { RoundedCard } from '../../Components/Cards/v2/RoundedCard';
import ResumeCard from '../../Components/Cards/v2/ResumeCard';
import { Link } from 'react-router-dom';

const technologies = [
  { imageSrc: require('../../Components/Images/Icons/C_Sharp.svg.png'), text: 'C#' },
  { imageSrc: require('../../Components/Images/Icons/Javascript.png'), text: 'JavaScript' },
  { imageSrc: require('../../Components/Images/Icons/Typescript.png'), text: 'TypeScript' },
  { imageSrc: require('../../Components/Images/Icons/kotlin.png'), text: 'Kotlin' },
  { imageSrc: require('../../Components/Images/Icons/react.png'), text: 'React' },
  { imageSrc: require('../../Components/Images/Icons/react.png'), text: 'React Native' },
];

const playground = [
  { imageSrc: require('../../Components/Images/Icons/react.png'), text: 'Web Development' },
  { imageSrc: require('../../Components/Images/Icons/onepoint.png'), text: '1Point Loyalty Platform' },
  { imageSrc: require('../../Components/Images/Icons/flickpick.png'), text: 'FlickPick Movie App' },
  { imageSrc: require('../../Components/Images/Icons/figma.png'), text: 'Figma UI Designs' },
];


function Home() {
  const isMobile = useMediaQuery('(max-width: 1040px)');
  const ExperienceWords = ['in FinTech for better Small Businesses 🎉', 'education using Virtual Reality 📚', 'in supply chain using Augmented Reality 🕶️', 'in software to create Smart Factories 🏭'];  
  const PlaygroundWords = ['develop a loyalty program 🎉', 'make a temperature sensing glove 📚', 'use Computer Aided Design software', 'design user interfaces using Figma 🏭'];  

  if (isMobile) {
    // Render only the ResumeCard on mobile
    return (
      <div className='background' style={{ backgroundColor: 'black', width: '100vw', height: '180vh' }}>
        <Grid container justifyContent="center" style={{ padding: '50px'}}>
          <ResumeCard />
          
              <RoundedCard text='EXPERIENCE' subtext={<div>Explore my experiences developing <TypingEffect words={ExperienceWords} /></div>} size='xl' color='#151515' link='https://www.linkedin.com/in/aryanved'>
              <div style={{ display: 'grid',     gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
 }}>
              {technologies.map((tech, index) => (
                <TechnologyPill key={index} imageSrc={tech.imageSrc} text={tech.text} />
              ))}
            </div>
              </RoundedCard>
              <RoundedCard text='PLAYGROUND' subtext={<div>Check out my projects where I <TypingEffect words={PlaygroundWords} /></div>} size='xl' color='#151515' link='https://www.github.com/aryanxved'>
            <div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '5px',
  }}
>
  {playground.map((tech, index) => (
    <TechnologyPill key={index} imageSrc={tech.imageSrc} text={tech.text} />
  ))}
</div>
            </RoundedCard>
                    </Grid>
      </div>
    );
  }

  return (
      <div className='background' style={{backgroundColor: 'black', width: '100vw', height: '100vh'}}>
        <div style={{padding: '20px'}}>
          <NavBar></NavBar>
        </div>
        <div>
        <Grid container spacing={0} direction='row' justifyContent='space-evenly'>
          <Grid container item xs={8} style={{paddingLeft: '2vw'}}>
            <Grid container item xs={8} direction='row'>
              <RoundedCard text='EXPERIENCE' subtext={<div>Explore my experiences developing <TypingEffect words={ExperienceWords} /></div>} size='xl' color='#151515' link='https://www.linkedin.com/in/aryanved'>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {technologies.map((tech, index) => (
                <TechnologyPill key={index} imageSrc={tech.imageSrc} text={tech.text} />
              ))}
            </div>
              </RoundedCard>
            </Grid>
            <Grid container item xs={4} direction='row'>
            <RoundedCard text='' size='sm' color='#454548'>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
              <img src={require('../../Components/Images/Education/headshot.jpg')} style={{ height: '320px', width: '320px' }} alt="UW Logo" />            
              </div>
            </RoundedCard>
            </Grid>
            <Grid container item xs={4} direction='row'>
            <RoundedCard text='' size='sm' color='#000000'>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
              <img src={require('../../Components/Images/Education/UWLogo.png')} style={{ height: '300px', width: '300px' }} alt="UW Logo" />            
              </div>
              </RoundedCard>
            </Grid>
            <Grid container item xs={8} direction='row'>
            <RoundedCard text='PLAYGROUND' subtext={<div>Check out my projects where I <TypingEffect words={PlaygroundWords} /></div>} size='xl' color='#151515' link='https://www.github.com/aryanxved'>
            <div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '10px',
  }}
>
  {playground.map((tech, index) => (
    <TechnologyPill key={index} imageSrc={tech.imageSrc} text={tech.text} />
  ))}
</div>
            </RoundedCard>
            </Grid>
          </Grid>
          
          <Grid container item xs={4} style={{paddingRight: '2vw'}}>
          <ResumeCard />
          </Grid>
        </Grid>
        </div>
      </div>
    );
  }

  interface TechnologyPillProps {
    imageSrc: string;
    text: string;
  }
  
  const TechnologyPill = ({ imageSrc, text }: TechnologyPillProps) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#1e1e1e', borderRadius: '20px', padding: '10px 20px', marginTop: '20px' }}>
        <img src={imageSrc} alt={text} style={{ width: '50px', height: '50px', marginRight: '10px', borderRadius: '50%' }} />
        <span style={{ color: '#ffffff', fontSize: '1rem' }}>{text}</span>
      </div>
    );
  };

  const TypingEffect = ({ words }: { words: string[] }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(150);
  
    useEffect(() => {
      const handleTyping = () => {
        const currentWord = words[currentWordIndex];
        if (isDeleting) {
          setDisplayedText(currentWord.substring(0, displayedText.length - 1));
          setTypingSpeed(50);
        } else {
          setDisplayedText(currentWord.substring(0, displayedText.length + 1));
          setTypingSpeed(150);
        }
  
        if (!isDeleting && displayedText === currentWord) {
          setTimeout(() => setIsDeleting(true), 1000);
        } else if (isDeleting && displayedText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
      };
  
      const typingTimeout = setTimeout(handleTyping, typingSpeed);
  
      return () => clearTimeout(typingTimeout);
    }, [displayedText, isDeleting, typingSpeed, words, currentWordIndex]);
  
    return (
      <span>
        {displayedText}
        <span className="cursor">|</span>
      </span>
    );
  };



export default Home;
