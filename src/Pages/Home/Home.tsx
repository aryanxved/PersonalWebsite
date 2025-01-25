import React, { useEffect, useState } from 'react';
import {Card, CardActions, CardContent, Grid, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormLabel, RadioGroup, FormControlLabel, FormHelperText, CssBaseline} from "@material-ui/core/";
import './Home.css';
import NavBar from '../../Components/NavBar/NavBar';
import { RoundedCard } from '../../Components/Cards/v2/RoundedCard';
import ResumeCard from '../../Components/Cards/v2/ResumeCard';

function Home() {
  const ExperienceWords = ['in FinTech for better Small Businesses 🎉', 'education using Virtual Reality 📚', 'in supply chain using Augmented Reality 🕶️', 'in software to create Smart Factories 🏭'];  
  const PlaygroundWords = ['develop a loyalty program 🎉', 'make a temprature sensing glove 📚', 'use Computer Aided Design software', 'design user interfaces using Figma 🏭'];  

  return (
      <div className='background' style={{backgroundColor: 'black', width: '100vw', height: '100vh'}}>
        <div style={{padding: '20px'}}>
          <NavBar></NavBar>
        </div>
        <div>
        <Grid container spacing={0} direction='row' justifyContent='space-evenly'>
          <Grid container item xs={8} style={{paddingLeft: '2vw'}}>
            <Grid container item xs={8} direction='row'>
              <RoundedCard text='EXPERIENCE' subtext={<div>Explore my experiences developing <TypingEffect words={ExperienceWords} /></div>} size='xl' color='#151515'>
              </RoundedCard>
            </Grid>
            <Grid container item xs={4} direction='row'>
            <RoundedCard text='' size='sm' color='#151515'></RoundedCard>
            </Grid>
            <Grid container item xs={4} direction='row'>
            <RoundedCard text='' size='sm' color='#000000'>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
              <img src={require('../../Components/Images/Education/UWLogo.png')} style={{ height: '300px', width: '300px' }} alt="UW Logo" />            
              </div>
              </RoundedCard>
            </Grid>
            <Grid container item xs={8} direction='row'>
            <RoundedCard text='PLAYGROUND' subtext={<div>Check out my projects where I <TypingEffect words={PlaygroundWords} /></div>} size='xl' color='#151515'></RoundedCard>
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
