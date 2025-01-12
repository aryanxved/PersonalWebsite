import React from 'react';
import {Card, CardActions, CardContent, Grid, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormLabel, RadioGroup, FormControlLabel, FormHelperText, CssBaseline} from "@material-ui/core/";
import { Typography } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';



const FloatingToggle = () => {
let toggleState = 1;
    return(
        <Card style={{marginLeft: "25%", marginRight: '25%', marginBottom: "4%", marginTop: "4%", height: "10vh", width: "auto", color: "black", backgroundColor:"#282B30", align: "center", borderRadius: "50px"}}>
            <Button style={{align: 'center', marginTop: '0.5%'}} target="_blank" onClick={toggleState = 1}>
            <Card style={{height: "5vh", width: "20vh", color: "black", backgroundColor:"orange", align: "center", borderRadius: "50px"}}>
              <Typography style={{align: "center"}}>Experience</Typography>
              </Card>
                </Button>
                
                <Button style={{align: 'center', marginTop: '0.5%'}} target="_blank" onClick={toggleState = 2}>
                <Card style={{height: "5vh", width: "20vh", color: "black", backgroundColor:"orange", align: "center", borderRadius: "50px"}}>
                <Typography>Education</Typography>
                </Card>
                </Button>
        </Card>
    );
}

export default FloatingToggle;
