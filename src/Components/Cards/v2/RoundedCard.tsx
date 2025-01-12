import React from 'react'
import {Box, Card} from "@material-ui/core/";
import { ArrowSquareOut, Link } from '@phosphor-icons/react'

interface RoundedCardProps {
size: string
color: string
text?: string
children?: React.ReactNode;
}

interface CardTextProps {
  text?: string;
}

export const RoundedCard = (props: RoundedCardProps) => {
let cardType;

switch(props.size) {
  case 'sm':
    cardType = (
      <Card style={{width: '30vw', height: '39vh', marginRight: '1vw', borderRadius: '25px', backgroundColor: props.color, marginBottom: '2vh'}}>
        <CardText text={props.text}/>
        {props.children}
      </Card>
    );
    break;
  case 'md':
    cardType = (
      <Card style={{width: '40vw', height: '39vh', marginRight: '1vw', borderRadius: '25px', backgroundColor: props.color, marginBottom: '2vh'}}>
        <CardText text={props.text}/>
        {props.children}
        </Card>
    );
    break;
  case 'lg':
    cardType = (
      <Card style={{width: '60vw', height: '39vh', marginRight: '1vw', borderRadius: '25px', backgroundColor: props.color, marginBottom: '2vh'}}>
        <CardText text={props.text}/>
        {props.children}
        </Card>
    );
    break;
    case 'xl':
      cardType = (
        <Card style={{width: '80vw', height: '39vh', marginRight: '1vw', borderRadius: '25px', backgroundColor: props.color, marginBottom: '2vh', boxShadow: '0px 0px 10px 0px rgba(255,255,255,0.75)'}}>
        <CardText text={props.text}/>
        {props.children}
        </Card>
      );
      break;
    case 'xxl':
      cardType = (
        <Card style={{width: '100vw', height: '80vh', borderRadius: '25px', backgroundColor: '#151515', boxShadow: '0px 0px 10px 0px rgba(255,255,255,0.75)'}}>
        <CardText text={props.text}/>
        {props.children}
        </Card>
      );
      break;
  default:
    cardType = (
      <Card style={{width: '100vw', height: '39vh', marginRight: '1vw', borderRadius: '25px', backgroundColor: props.color, marginBottom: '2vh'}}>
        <CardText text={props.text}/>
        {props.children}
        </Card>
    );
}

return (
  <>
    {cardType}
  </>
);
};

const CardText = ({ text }: CardTextProps) => {
  return (
    <div style={{color: 'white', fontSize: '3.5rem', padding: '1rem', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold'}}>
      <span>{text}</span>
      {text ? <CardLink/> : ''}
    </div>
  );
};

const CardLink = () => {
  return (
    <span>
      <ArrowSquareOut size={56} color="#ffffff"/>
    </span>
  );
}

