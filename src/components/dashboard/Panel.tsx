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
  colorType?: 'default' | 'alert' | 'blue' | 'green' | 'purple';
}

const Panel: React.FC<PanelProps> = ({ 
  title, 
  icon, 
  children, 
  linkTo, 
  linkText = 'Tümünü Gör',
  headerContent,
  className = '',
  colorType = 'default'
}) => {
  // Renk tipine göre başlık sınıfını belirle
  let headerClass = 'panel-header';
  
  switch (colorType) {
    case 'alert':
      headerClass = 'alert-panel-header';
      break;
    case 'blue':
      headerClass = 'blue-panel-header';
      break;
    case 'green':
      headerClass = 'green-panel-header';
      break;
    case 'purple':
      headerClass = 'purple-panel-header';
      break;
    default:
      headerClass = 'default-panel-header';
  }
  
  return (
    <div className={`panel ${className}`}>
      <div className={headerClass}>
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