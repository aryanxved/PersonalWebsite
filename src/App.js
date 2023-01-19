import React from 'react';
import { Typography } from '@mui/material';
import {Card, CardActions, CardContent, Grid, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormLabel, RadioGroup, FormControlLabel, FormHelperText, CssBaseline} from "@material-ui/core/";
import { height } from '@mui/system';
import { makeStyles } from '@material-ui/styles';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import Link from '@material-ui/core/Link';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="backdroplanding">
      
    <div style={{color: 'red', backgroundColor: '#1e2124', height: '100%'}}>
    <CssBaseline /> 
        <div>
            <Card style={{color: 'white', backgroundColor: '#3f50b5'}}>
            <Typography align="center" variant="h1" component="div" gutterBottom style={{fontFamily: 'Roboto'}}>
            Aryan's Website
            </Typography>
            </Card>
        </div>

        <div align="center" marginTop="50px">
    <Card style={{color: 'white', backgroundColor: '#282b30', marginLeft: "20%", marginRight: '20%',  marginTop: "50px", height: "73vh"}}>
    <Card style={{maxWidth: 650, marginTop:"50px", color: "white", backgroundColor:"#3f50b5", align: "center"}} align="center">
    <CardContent>
        <Typography style={{ fontSize: 25, fontFamily: 'Roboto'}} color="white" gutterBottom>
            Uh Oh! 
            <br />
            You're here a little early!
        </Typography>
        <Typography style={{ mb: 2 }} color="white">
        <br />
            
            Version 2.0 is coming!
            <br />
            This website is currently undergoing major updates!
            <br />
            Visit back soon. Check out these few links below.
        </Typography>
        <Typography variant="body2">
        <br />
        <br />
        <Button target="_blank" href="https://www.linkedin.com/in/aryanved/">
          <LinkedInIcon style={{fontSize: 50, color: 'white'}}>
          Link
            </LinkedInIcon>
            </Button>
            
            <Button target="_blank" href="https://github.com/aryanxved">
          <GitHubIcon style={{fontSize: 50, color: 'white'}}>
          Link
            </GitHubIcon>
            </Button>
            
            <Button target="_blank" href="https://drive.google.com/file/d/1XKODjDXjbn9yCmgUgGJOlr1Gi5leun6X/view?usp=sharing">
          <DescriptionOutlinedIcon style={{fontSize: 50, color: 'white'}}>
          Link
            </DescriptionOutlinedIcon>
            </Button>
        </Typography>
    </CardContent>
    </Card>
    </Card>
</div>
    </div>
</div>
  );
}

export default App;
