import React from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface PanelProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  linkTo?: string;
  linkText?: string;
  headerContent?: ReactNode;
  className?: string;
}

const Panel: React.FC<PanelProps> = ({ 
  title, 
  icon, 
  children, 
  linkTo, 
  linkText = 'Tümünü Gör',
  headerContent,
  className = ''
}) => {
  const baseHeaderClass = linkTo ? 'alert-panel-header' : 'panel-header';
  
  return (
    <div className={`panel ${className}`}>
      <div className={baseHeaderClass}>
        <div className="panel-header-content">
          {icon && <div className="panel-icon">{icon}</div>}
          <h2 className="panel-title">{title}</h2>
        </div>
        
        {headerContent && headerContent}
        
        {linkTo && (
          <Link to={linkTo} className="panel-link">
            {linkText}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
      <div className="panel-body">
        {children}
      </div>
    </div>
  );
};

export default Panel; 