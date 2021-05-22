import React from 'react';
import { IconType } from 'react-icons';
import './Button.scss';

interface ButtonProps {
  text?: string;
  onClick: () => void;
  disabled?: boolean;
  type?: 'secondary' | 'danger';
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({ icon: Icon, type = 'primary', text, onClick, disabled }) => {
  return (
    <button className={`btn btn-${type} ${Icon ? 'btn-icon' : ''} ${disabled ? 'btn-disabled' : ''}`} onClick={onClick} disabled={disabled}>
      {Icon ? <Icon /> : text}
    </button>
  );
};
export default Button;
