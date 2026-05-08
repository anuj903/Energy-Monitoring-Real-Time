import React from 'react';
import { ProcessEnergyData } from '../../types/data';
import { Activity, Battery, Zap } from 'lucide-react';

interface ProcessCardsSectionProps {
  processData: ProcessEnergyData[];
}

const ProcessCardsSection: React.FC<ProcessCardsSectionProps> = ({ processData }) => {
  const getStatusColor = (powerFactor: number) => {
    if (powerFactor >= 0.9) return 'text-emerald-500';
    if (powerFactor >= 0.8) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {processData.map((process) => (
        <div key={process.Process} className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold text-gray-800">{process.Process}</h3>
            <div className={`flex items-center ${getStatusColor(process.PowerFactor)}`}>
              <Activity className="w-5 h-5" />
            </div>
          </div>

          <div className="space-y-4">
            {/* Power Usage */}
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <Zap className="w-4 h-4 mr-2" />
                <span className="text-sm">Power Usage</span>
              </div>
              <span className="text-sm font-semibold">{process.Power.toFixed(2)} kW</span>
            </div>

            {/* Energy Consumption */}
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <Battery className="w-4 h-4 mr-2" />
                <span className="text-sm">Consumption</span>
              </div>
              <span className="text-sm font-semibold">{process.Consumption.toFixed(2)} kVAh</span>
            </div>

            {/* Power Factor */}
            <div className="pt-3 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Power Factor</span>
                <span className={`text-sm font-semibold ${getStatusColor(process.PowerFactor)}`}>
                  {process.PowerFactor.toFixed(2)}
                </span>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    process.PowerFactor >= 0.9 
                      ? 'bg-emerald-500' 
                      : process.PowerFactor >= 0.8 
                        ? 'bg-yellow-500' 
                        : 'bg-red-500'
                  }`}
                  style={{ width: `${process.PowerFactor * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProcessCardsSection;