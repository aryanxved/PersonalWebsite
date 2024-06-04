import React from 'react';
import {Card, CardActions, CardContent, Grid, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormLabel, RadioGroup, FormControlLabel, FormHelperText, CssBaseline} from "@material-ui/core/";
import { Typography } from '@mui/material';
import EsteeImg from "../Images/Estee.jpg"


const LandingExp = () => {

    return(
        <div>
            <Card style={{ backgroundImage: `url(${EsteeImg})`, marginLeft: "2%", marginRight: '2%', marginTop:"2%", marginBottom: "2%", height: "49vh", width: "auto", color: "black", backgroundColor:"#232323", align: "center", borderRadius: "80px"}}>
            
            </Card>
        </div>
    );
}

export default LandingExp;
