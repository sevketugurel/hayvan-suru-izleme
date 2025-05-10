import React from 'react';
import { Link } from 'react-router-dom';
import './MetricCard.css';

interface MetricCardProps {
  title: string;
  value: number;
  type: 'blue' | 'green' | 'amber' | 'red' | 'purple' | 'pink';
  icon: React.ReactNode;
  linkTo?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, type, icon, linkTo }) => {
  const CardContent = () => (
    <>
      <div className="metric-icon">
        {icon}
      </div>
      <div className="metric-info">
        <div className="metric-title">{title}</div>
        <div className="metric-value">{value}</div>
      </div>
    </>
  );

  return linkTo ? (
    <Link to={linkTo} className={`metric-card ${type}`}>
      <CardContent />
    </Link>
  ) : (
    <div className={`metric-card ${type}`}>
      <CardContent />
    </div>
  );
};

export default MetricCard; 