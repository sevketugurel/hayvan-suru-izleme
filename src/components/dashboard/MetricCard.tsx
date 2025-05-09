import React from 'react';
import type { ReactNode } from 'react';
import type { MetricCardType } from '../../types';

interface MetricCardProps {
  title: string;
  value: number;
  type: MetricCardType;
  icon: ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, type, icon }) => {
  return (
    <div className={`metric-card ${type}`}>
      <div className="metric-card-content">
        <div className="metric-info">
          <p>{title}</p>
          <p className="metric-value">{value}</p>
        </div>
        <div className={`metric-icon ${type}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default MetricCard; 