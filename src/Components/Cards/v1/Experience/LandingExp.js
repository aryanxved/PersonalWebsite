import React from 'react';
import {Card, CardActions, CardContent, Grid, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormLabel, RadioGroup, FormControlLabel, FormHelperText, CssBaseline} from "@material-ui/core/";
import { Typography } from '@mui/material';
import EsteeImg from "../../Images/Experience/Estee.jpg"
import ShoplogixImg from "../../Images/Experience/Shoplogix.jpeg"
import ManulifeImg from "../../Images/Experience/Manulife.png"
import RBCImg from "../../Images/Experience/RBC.png"
import PreschoolCanadaImg from "../../Images/Experience/PreschoolCanada.jpeg"
import WaterlooEng from "../../Images/Education/WaterlooEng.jpg"
import RelayImg from "../../Images/Experience/Relay.jpeg"


const LandingExp = () => {

    return(
        <div>
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
                <Card style={{ backgroundImage: `url(${RelayImg})`, backgroundSize: '100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', marginLeft: "2%", marginRight: '2%', marginTop:"2%", marginBottom: "2%", height: "49vh", width: "auto", color: "black", backgroundColor:"#004822", align: "center", borderRadius: "80px"}}>
                </Card>
              </div>              
              </Grid>
          </Grid>
        </div>
    );
}

export default LandingExp;
