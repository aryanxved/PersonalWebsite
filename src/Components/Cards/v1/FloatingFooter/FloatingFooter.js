import {Card, CardActions, CardContent, Grid, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormLabel, RadioGroup, FormControlLabel, FormHelperText, CssBaseline} from "@material-ui/core/";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';



const FloatingFooter = () => {

    return(
        <Card style={{marginLeft: "3%", marginRight: '3%', height: "8vh", width: "auto", color: "white", backgroundColor:"#151515", align: "center", borderRadius: "50px"}}>
            <Button style={{align: 'center', marginTop: '0.5%'}} href="https://www.linkedin.com/in/aryanved/">
              <LinkedInIcon style={{fontSize: 50, color: 'white'}}>
              Link
                </LinkedInIcon>   
                </Button>
                
                <Button style={{align: 'center', marginTop: '0.5%'}} href="https://github.com/aryanxved">
              <GitHubIcon style={{fontSize: 50, color: 'white'}}>
              Link
                </GitHubIcon>
                </Button>
                
                <Button style={{align: 'center', marginTop: '0.5%'}}  href="https://drive.google.com/file/d/1QAb-Hu17EHdMdj3fo0lEfFx5Z84hnvUr/view?usp=sharing">
              <DescriptionOutlinedIcon style={{fontSize: 50, color: 'white'}}>
              Link
                </DescriptionOutlinedIcon>
                </Button>
</Card>
    );
}

export default FloatingFooter;
