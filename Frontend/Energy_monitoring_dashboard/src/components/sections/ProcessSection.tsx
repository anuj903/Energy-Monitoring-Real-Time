import React, { useState } from 'react';
import { ProcessEnergyData } from '../../types/data';
import ProcessBarChart from '../charts/ProcessBarChart';

interface ProcessSectionProps {
  processData: ProcessEnergyData[];
}

const ProcessSection: React.FC<ProcessSectionProps> = ({ processData }) => {
  const [activeTab, setActiveTab] = useState<'power' | 'consumption' | 'powerFactor'>('power');

  const tabs = [
    { id: 'power', label: 'Power', unit: 'kW' },
    { id: 'consumption', label: 'Consumption', unit: 'kVAh' },
    { id: 'powerFactor', label: 'Power Factor', unit: '' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Process Energy Breakdown</h2>
      
      <div className="flex space-x-1 mb-4 bg-gray-100 p-1 rounded-md">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex-1 py-1 px-2 text-sm font-medium rounded-md transition-colors
              ${activeTab === tab.id 
                ? 'bg-white text-emerald-700 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'}`}
            onClick={() => setActiveTab(tab.id as any)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {processData.length > 0 ? (
        <ProcessBarChart 
          data={processData} 
          valueKey={activeTab === 'powerFactor' ? 'PowerFactor' : activeTab === 'consumption' ? 'Consumption' : 'Power'}
          title={tabs.find(t => t.id === activeTab)?.label || ''}
          unit={tabs.find(t => t.id === activeTab)?.unit || ''}
          color={activeTab === 'power' 
            ? 'rgba(52, 211, 153, 1)' 
            : activeTab === 'consumption' 
              ? 'rgba(59, 130, 246, 1)' 
              : 'rgba(249, 115, 22, 1)'}
        />
      ) : (
        <div className="h-72 flex items-center justify-center">
          <p className="text-gray-500">Waiting for process data...</p>
        </div>
      )}
    </div>
  );
};

export default ProcessSection;