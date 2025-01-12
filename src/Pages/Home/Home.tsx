import React from 'react';
import {Card, CardActions, CardContent, Grid, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormLabel, RadioGroup, FormControlLabel, FormHelperText, CssBaseline} from "@material-ui/core/";
import './Home.css';
import NavBar from '../../Components/NavBar/NavBar';
import { RoundedCard } from '../../Components/Cards/v2/RoundedCard';
import ResumeCard from '../../Components/Cards/v2/ResumeCard';

function Home() {
    return (
      <div className='background' style={{backgroundColor: 'black', width: '100vw', height: '100vh'}}>
        <div style={{padding: '20px'}}>
          <NavBar></NavBar>
        </div>
        <div>
        <Grid container spacing={0} direction='row' justifyContent='space-evenly'>
          <Grid container item xs={8} style={{paddingLeft: '2vw'}}>
            <Grid container item xs={8} direction='row'>
              <RoundedCard text='EXPERIENCE' size='xl' color='#151515'></RoundedCard>
            </Grid>
            <Grid container item xs={4} direction='row'>
            <RoundedCard text='' size='sm' color='#151515'></RoundedCard>
            </Grid>
            <Grid container item xs={4} direction='row'>
            <RoundedCard text='' size='sm' color='#151515'></RoundedCard>
            </Grid>
            <Grid container item xs={8} direction='row'>
            <RoundedCard text='PLAYGROUND' size='xl' color='#151515'></RoundedCard>
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

export default Home;
