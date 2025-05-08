import React from 'react';

interface ProgressBarProps {
  label: string;
  value: number;
  colorClass: 'green' | 'amber' | 'red' | 'blue';
  showPercentage?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  label, 
  value, 
  colorClass,
  showPercentage = true
}) => {
  const percentage = Math.round(value * 100);
  
  return (
    <div className="progress-container">
      <div className="progress-header">
        <span className="progress-label">{label}</span>
        {showPercentage && (
          <span className={`progress-value ${colorClass}`}>
            {percentage}%
          </span>
        )}
      </div>
      <div className="progress-bar">
        <div 
          className={`progress-bar-fill ${colorClass}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar; 