import React, { ReactNode } from 'react';
import './Card.scss';

interface CardProps {
  children: ReactNode;
  title: string;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className='card'>
      <div className='card-header'>
        <h2 className='page-title'>{title}</h2>
      </div>
      <div className='card-body'>{children}</div>
    </div>
  );
};

export default Card;
