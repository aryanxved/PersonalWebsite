import React from 'react';
import { Box, Card } from '@material-ui/core';
import { ArrowSquareOut } from '@phosphor-icons/react';
import './RoundedCard.css';

interface RoundedCardProps {
  size: string;
  color: string;
  text?: string;
  subtext?: React.ReactNode;
  link?: string;
  children?: React.ReactNode;
}

interface CardTextProps {
  text?: string;
  subtext?: React.ReactNode;
}

export const RoundedCard = (props: RoundedCardProps) => {
  const isGlow = props.size === 'xl' || props.size === 'lg';

  return (
    <Card
      className={`rounded-card rounded-card-${props.size} ${isGlow && 'rounded-card-glow'}`}
      style={{ backgroundColor: props.color }}
    >
      <div className={`${props.link ? 'card-content' : 'card-content-nolink'}`} style={{ backgroundColor: props.color }}>
        {props.link ? (
          <a style={{ textDecoration: 'none' }} target='_blank' rel='noopener noreferrer' href={props.link}>
            <CardText text={props.text} subtext={props.subtext} />
            {props.children}
          </a>
        ) : (
          <>
            <CardText text={props.text} subtext={props.subtext} />
            {props.children}
          </>
        )}
      </div>
    </Card>
  );
};

const CardText = ({ text, subtext }: CardTextProps) => {
  return (
    <><div className="card-text">
      <span>{text}</span>
      {text ? <CardLink /> : ''}
    </div>
    <div className="card-sub-text">
        <span>{subtext}</span>
      </div></>
  );
};

const CardLink = () => {
  return (
    <span>
      <ArrowSquareOut size={56} color="#ffffff" />
    </span>
  );
};


