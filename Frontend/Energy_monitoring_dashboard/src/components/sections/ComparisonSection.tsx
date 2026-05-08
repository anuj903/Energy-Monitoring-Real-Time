import React from 'react';
import ComparisonCard from '../cards/ComparisonCard';
import { ConsumptionPerTonne, MonthlyData, TodayData } from '../../types/data';

interface ComparisonSectionProps {
  consumptionPerTonne: ConsumptionPerTonne | null;
  monthlyData: MonthlyData | null;
  todayData: TodayData | null;
}

const ComparisonSection: React.FC<ComparisonSectionProps> = ({
  consumptionPerTonne,
  monthlyData,
  todayData,
}) => {
  const productionEfficiency = todayData ? 
    (todayData.TodayProduction / todayData.TodayConsumption) * 100 : 0;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {consumptionPerTonne && (
        <ComparisonCard
          title="Consumption Per Tonne"
          currentValue={consumptionPerTonne.ThisMonthConsumptionPerTonne}
          previousValue={consumptionPerTonne.PreviousMonthConsumptionPerTonne}
          unit="kVAh/t"
        />
      )}
      
      {monthlyData && (
        <ComparisonCard
          title="Monthly Consumption"
          currentValue={monthlyData.ThisMonthConsumption}
          previousValue={monthlyData.PreviousMonthConsumption}
          unit="kVAh"
        />
      )}
      
      {todayData && (
        <ComparisonCard
          title="Today's Consumption"
          currentValue={todayData.TodayConsumption}
          previousValue={todayData.TodayProduction}
          unit="kVAh"
          showChange={false}
        />
      )}
      
      {todayData && (
        <div className="bg-white rounded-lg shadow-sm p-4 h-full">
          <h3 className="text-gray-500 font-medium text-sm uppercase">Production Efficiency</h3>
          <div className="flex items-center justify-center h-16 mt-2">
            <span className="text-2xl font-bold text-emerald-600">
              {productionEfficiency.toFixed(1)}%
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            <p className="flex justify-between">
              <span>Production:</span>
              <span className="font-medium">{todayData.TodayProduction.toFixed(1)} kVAh</span>
            </p>
            <p className="flex justify-between">
              <span>Consumption:</span>
              <span className="font-medium">{todayData.TodayConsumption.toFixed(1)} kVAh</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonSection;