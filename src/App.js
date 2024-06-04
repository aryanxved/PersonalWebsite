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
import NavBar from './NavBar/NavBar';
import LandingExp from './Cards/LandingExp';
import EsteeImg from "../src/Images/Estee.jpg"
import ShoplogixImg from "../src/Images/Shoplogix.jpeg"
import ManulifeImg from "../src/Images/Manulife.png"
import RBCImg from "../src/Images/RBC.png"
import PreschoolCanadaImg from "../src/Images/PreschoolCanada.jpeg"
import WaterlooEng from "../src/Images/WaterlooEng.jpg"

function App() {
  return (
    <div className="backdroplanding">
      
    <div style={{color: 'red', backgroundColor: 'black'}}>
    <CssBaseline /> 
        <div>
            <NavBar></NavBar>
            {/* <Card style={{color: 'white', backgroundColor: '#3f50b5'}}>
            <Typography align="center" variant="h1" component="div" gutterBottom style={{fontFamily: 'Roboto'}}>
            Aryan's Website
            </Typography>
            </Card> */}
        </div>

        <div align="center" marginTop="50px" marginBottom="50px">
    <Card className="background" style={{color: 'white', backgroundColor: '#282b30', marginLeft: "2%", marginRight: '2%',  marginTop: "50px", height: "auto", borderRadius: "100px"}}>
      <CardContent>
        <Card style={{position:'relative', marginLeft: "0.5%", marginRight: '0.5%', marginTop:"0.5%", marginBottom: "0.5%", height: "auto", color: "white", backgroundColor:"#131313", align: "center", borderRadius: "70px"}} align="center">
        <CardContent>
          <Grid container direction="row" justifyContent="center">
          <Grid item xs={2}>
              <div>
                <Card style={{ backgroundImage: `url(${PreschoolCanadaImg})`, backgroundSize: '100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', marginLeft: "2%", marginRight: '2%', marginTop:"2%", marginBottom: "2%", height: "49vh", width: "auto", color: "black", backgroundColor:"#BF2130", align: "center", borderRadius: "80px"}}>
                </Card>
              </div>              
              </Grid>
              <Grid item xs={2}>
              <div>
                <Card style={{ backgroundImage: `url(${EsteeImg})`, backgroundSize: '100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', marginLeft: "2%", marginRight: '2%', marginTop:"2%", marginBottom: "2%", height: "49vh", width: "auto", color: "black", backgroundColor:"#051C2E", align: "center", borderRadius: "80px"}}>
                </Card>
              </div>
              </Grid>
              <Grid item xs={2}>
              <div>
                <Card style={{ backgroundImage: `url(${ManulifeImg})`, backgroundSize: '100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', marginLeft: "2%", marginRight: '2%', marginTop:"2%", marginBottom: "2%", height: "49vh", width: "auto", color: "black", backgroundColor:"#00A658", align: "center", borderRadius: "80px"}}>
                </Card>
              </div>              
              </Grid>
              <Grid item xs={2}>
              <div>
                <Card style={{ backgroundImage: `url(${RBCImg})`, backgroundSize: '100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', marginLeft: "2%", marginRight: '2%', marginTop:"2%", marginBottom: "2%", height: "49vh", width: "auto", color: "black", backgroundColor:"#0050A4", align: "center", borderRadius: "80px"}}>
                </Card>
              </div>              
              </Grid>
              <Grid item xs={2}>
              <div>
                <Card style={{ backgroundImage: `url(${ShoplogixImg})`, backgroundSize: '100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', marginLeft: "2%", marginRight: '2%', marginTop:"2%", marginBottom: "2%", height: "49vh", width: "auto", color: "black", backgroundColor:"#024F6E", align: "center", borderRadius: "80px"}}>
                </Card>
              </div>              
              </Grid>
              <Grid item xs={2}>
              <div>
                <Card style={{ backgroundImage: `url(${WaterlooEng})`, backgroundSize: '100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', marginLeft: "2%", marginRight: '2%', marginTop:"2%", marginBottom: "2%", height: "49vh", width: "auto", color: "black", backgroundColor:"black", align: "center", borderRadius: "80px"}}>
                </Card>
              </div>              
              </Grid>
          </Grid>
        </CardContent>
        </Card>
      </CardContent>
    </Card>
    <Card style={{marginLeft: "6%", marginRight: '6%', marginTop:"50px", color: "white", backgroundColor:"#3f50b5", align: "center"}} align="center">
</Card>
<Card style={{marginLeft: "4%", marginRight: '4%', marginBottom: "4%", height: "10vh", width: "auto", color: "black", backgroundColor:"#282B30", align: "center", borderRadius: "50px"}}>
            <Button style={{align: 'center', marginTop: '0.5%'}} target="_blank" href="https://www.linkedin.com/in/aryanved/">
              <LinkedInIcon style={{fontSize: 50, color: 'white'}}>
              Link
                </LinkedInIcon>
                </Button>
                
                <Button style={{align: 'center', marginTop: '0.5%'}} target="_blank" href="https://github.com/aryanxved">
              <GitHubIcon style={{fontSize: 50, color: 'white'}}>
              Link
                </GitHubIcon>
                </Button>
                
                <Button style={{align: 'center', marginTop: '0.5%'}} target="_blank" href="https://drive.google.com/file/d/1QAb-Hu17EHdMdj3fo0lEfFx5Z84hnvUr/view?usp=sharing">
              <DescriptionOutlinedIcon style={{fontSize: 50, color: 'white'}}>
              Link
                </DescriptionOutlinedIcon>
                </Button>
</Card>
</div>
    </div>
</div>
  );
}

export default App;
