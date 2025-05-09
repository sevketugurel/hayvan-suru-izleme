import React from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ActionButtonProps {
  to: string;
  className: string;
  icon: ReactNode;
  children: ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({ to, className, icon, children }) => {
  return (
    <Link to={to} className={`action-button ${className}`}>
      {icon}
      {children}
    </Link>
  );
};

export default ActionButton; 