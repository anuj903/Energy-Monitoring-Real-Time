import React from 'react';

interface ComparisonCardProps {
  title: string;
  currentValue: number;
  previousValue: number;
  unit: string;
  showChange?: boolean;
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({
  title,
  currentValue,
  previousValue,
  unit,
  showChange = true,
}) => {
  const change = currentValue - previousValue;
  const percentChange = (change / previousValue) * 100;
  const isPositive = change > 0;
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 h-full">
      <h3 className="text-gray-500 font-medium text-sm uppercase">{title}</h3>
      
      <div className="mt-3 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Current:</span>
          <span className="text-sm font-semibold text-gray-900">{currentValue.toLocaleString()} {unit}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Previous:</span>
          <span className="text-sm font-semibold text-gray-900">{previousValue.toLocaleString()} {unit}</span>
        </div>
        
        {showChange && (
          <div className="pt-2 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Change:</span>
              <span 
                className={`text-sm font-semibold ${
                  isPositive ? 'text-emerald-500' : 'text-orange-500'
                }`}
              >
                {isPositive ? '+' : ''}{change.toLocaleString()} {unit} ({percentChange.toFixed(1)}%)
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonCard;