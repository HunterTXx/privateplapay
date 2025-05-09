
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: {
    value: string;
    isPositive: boolean;
  };
  subtitle?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, subtitle }) => {
  return (
    <div className="stat-card animate-fade-in">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
      <div className={`stat-change ${change.isPositive ? 'stat-change-positive' : 'stat-change-negative'}`}>
        {change.isPositive ? (
          <ArrowUp className="w-4 h-4 mr-1" />
        ) : (
          <ArrowDown className="w-4 h-4 mr-1" />
        )}
        {change.value} {subtitle && <span className="text-slate-500 ml-1">{subtitle}</span>}
      </div>
    </div>
  );
};

export default StatCard;
