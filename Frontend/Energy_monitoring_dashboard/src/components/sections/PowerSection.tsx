import React from 'react';
import { PowerDataPoint, CurrentPower } from '../../types/data';
import PowerLineChart from '../charts/PowerLineChart';
import { Zap } from 'lucide-react';

interface PowerSectionProps {
  powerData: PowerDataPoint[];
  currentPower: CurrentPower | null;
}

const PowerSection: React.FC<PowerSectionProps> = ({ powerData, currentPower }) => {
  // Get average, min and max from power data
  const powerValues = powerData.map(item => item.Total_Power_KW);
  const avgPower = powerValues.length 
    ? powerValues.reduce((sum, val) => sum + val, 0) / powerValues.length 
    : 0;
  const minPower = powerValues.length ? Math.min(...powerValues) : 0;
  const maxPower = powerValues.length ? Math.max(...powerValues) : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Power Consumption</h2>
        {currentPower && (
          <div className="flex items-center bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">
            <Zap className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">Current: {currentPower.TotalPower.toFixed(1)} kW</span>
          </div>
        )}
      </div>
      
      {powerData.length > 0 ? (
        <>
          <PowerLineChart data={powerData} />
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-gray-50 rounded-md p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">Average</p>
              <p className="text-lg font-semibold text-gray-800">{avgPower.toFixed(1)} kW</p>
            </div>
            <div className="bg-gray-50 rounded-md p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">Min</p>
              <p className="text-lg font-semibold text-gray-800">{minPower.toFixed(1)} kW</p>
            </div>
            <div className="bg-gray-50 rounded-md p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">Max</p>
              <p className="text-lg font-semibold text-gray-800">{maxPower.toFixed(1)} kW</p>
            </div>
          </div>
        </>
      ) : (
        <div className="h-72 flex items-center justify-center">
          <p className="text-gray-500">Waiting for power data...</p>
        </div>
      )}
    </div>
  );
};

export default PowerSection;