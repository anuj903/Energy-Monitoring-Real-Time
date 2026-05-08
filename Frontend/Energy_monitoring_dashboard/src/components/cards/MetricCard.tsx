import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  subtitle: string;
  changePercentage?: number;
  icon?: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  subtitle,
  changePercentage,
  icon,
}) => {
  const isPositive = changePercentage ? changePercentage > 0 : undefined;
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 h-full transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 font-medium text-sm uppercase">{title}</h3>
          <div className="flex items-baseline mt-1">
            <span className="text-2xl font-bold text-gray-800">{value.toLocaleString()}</span>
            <span className="ml-1 text-gray-600 text-sm">{unit}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        </div>
        {icon && <div className="text-emerald-500">{icon}</div>}
      </div>
      
      {changePercentage !== undefined && (
        <div className="mt-3 flex items-center">
          {isPositive ? (
            <ArrowUp className="w-4 h-4 text-emerald-500" />
          ) : (
            <ArrowDown className="w-4 h-4 text-orange-500" />
          )}
          <span 
            className={`text-sm font-medium ${
              isPositive ? 'text-emerald-500' : 'text-orange-500'
            }`}
          >
            {Math.abs(changePercentage).toFixed(1)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;