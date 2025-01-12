import { Card } from "@material-ui/core";
import { RoundedCard } from "./RoundedCard"
import FloatingFooter from "../v1/FloatingFooter/FloatingFooter";
import { Link } from 'react-router-dom';


interface ResumeRowProps {
    logo: string,
    company: string,
    role: string
}

const ResumeCard = () => {
    return (
       
            <RoundedCard text='RESUME' size='xxl' color='#151515'>
            <Link to="/resume">
                <ResumeContent />
                </Link>
            </RoundedCard>
 
    );
}
export default ResumeCard;

const ResumeContent = () => {
    return (
    <div style={{color: 'white'}}>
        <ResumeRow logo={require("../../Images/Experience/Relay.jpeg")} company="Relay Financial Technologies" role="Full Stack Engineer Intern" />
        <ResumeRow logo={require("../../Images/Experience/Shoplogix.jpeg")} company="Shoplogix" role="Software Developer Intern" />
        <ResumeRow logo={require("../../Images/Experience/RBC.png")} company="Royal Bank of Canada" role="Application Developer Intern" />
        <ResumeRow logo={require("../../Images/Experience/Manulife.png")} company="Manulife Financial Corporation" role="Software Developer Intern" />
        <ResumeRow logo={require("../../Images/Experience/Estee.jpg")} company="The Estee Lauder Companies" role="Augmented Reality Developer Intern" />
        <ResumeRow logo={require("../../Images/Experience/PreschoolCanada.jpeg")} company="Eh to Zed Preschool Canada" role="Junior Virtual Reality Designer Intern" />
        <FloatingFooter />
    </div>
    )
}

const ResumeRow = ({ logo, company, role }: ResumeRowProps) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', padding: '10px', alignItems: 'center', backgroundColor: '#363636', color: 'white', width: '90%', borderRadius: '50px', marginBottom: '1vh'}}>
            <img src={logo} alt={`${company} logo`} style={{ borderRadius: '50%', width: '50px', height: '50px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '1rem', textAlign: 'left'}}>
                <h3 style={{ margin: 0 }}>{company}</h3>
                <p style={{ margin: 0 }}>{role}</p>
            </div>
        </Card>
    </div>

    )
}