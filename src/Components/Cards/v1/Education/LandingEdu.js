import React from 'react';
import {Card, CardActions, CardContent, Grid, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormLabel, RadioGroup, FormControlLabel, FormHelperText, CssBaseline} from "@material-ui/core/";
import { Typography } from '@mui/material';
import WaterlooEng from "../../Images/Education/WaterlooEng.jpg"
import Chinguacousy from "../../Images/Education/Chinguacousy.jpg"

const LandingEdu = () => {

    return(
        <div>
            <Grid container direction="row" justifyContent="center">
              <Grid item xs={6}>
              <div>
                <Card style={{ backgroundImage: `url(${WaterlooEng})`, backgroundSize: '100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', marginLeft: "2%", marginRight: '2%', marginTop:"2%", marginBottom: "2%", height: "49vh", width: "auto", color: "black", backgroundColor:"black", align: "center", borderRadius: "80px"}}>
                </Card>
              </div>              
              </Grid>
              <Grid item xs={6}>
              <div>
                <Card style={{ backgroundImage: `url(${Chinguacousy})`, backgroundSize: '55%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', marginLeft: "2%", marginRight: '2%', marginTop:"2%", marginBottom: "2%", height: "49vh", width: "auto", color: "black", backgroundColor:"white", align: "center", borderRadius: "80px"}}>
                </Card>
              </div>
              </Grid>
          </Grid>
        </div>
    );
}

export default LandingEdu;
