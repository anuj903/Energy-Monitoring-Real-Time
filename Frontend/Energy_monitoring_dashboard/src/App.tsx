import React, { useEffect, useRef } from 'react';
import useWebSocket from './hooks/useWebSocket';
import Header from './components/Header';
import PowerSection from './components/sections/PowerSection';
import ProcessSection from './components/sections/ProcessSection';
import ProcessCardsSection from './components/sections/ProcessCardsSection';
import ComparisonSection from './components/sections/ComparisonSection';
import ConnectionStatus from './components/ConnectionStatus';
import MetricCard from './components/cards/MetricCard';

// Simple SVG icons
const ZapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const BarChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

function App() {
  const websocketUrl = "ws://localhost:5000/ws";
  const { dashboardData, isConnected, reconnect } = useWebSocket(websocketUrl);

  // For demonstration, we'll use the reconnect function from the hook
  const handleRetryConnection = () => {
    reconnect();
  };

  // Add a class to the body for animation tracking
  useEffect(() => {
    document.body.classList.add('dashboard-loaded');
    return () => {
      document.body.classList.remove('dashboard-loaded');
    };
  }, []);

  const getChangePercentage = (current: number, previous: number) => {
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isConnected={isConnected} />
      
      <main className="container mx-auto px-4 py-6">
        {/* Top Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
          <MetricCard
            title="Current Power"
            value={dashboardData.currentPower?.TotalPower || 0}
            unit="kW"
            subtitle="Real-time Total Power"
            icon={<ZapIcon />}
          />
          
          <MetricCard
            title="Today's Consumption"
            value={dashboardData.todayData?.TodayConsumption || 0}
            unit="kVAh"
            subtitle="Total Energy Used Today"
            changePercentage={
              dashboardData.todayData?.TodayConsumption && dashboardData.todayData?.TodayProduction
                ? getChangePercentage(
                    dashboardData.todayData.TodayConsumption,
                    dashboardData.todayData.TodayProduction
                  )
                : undefined
            }
          />
          
          <MetricCard
            title="Monthly Consumption"
            value={dashboardData.monthlyData?.ThisMonthConsumption || 0}
            unit="kVAh"
            subtitle="This Month"
            changePercentage={
              dashboardData.monthlyData?.ThisMonthConsumption && dashboardData.monthlyData?.PreviousMonthConsumption
                ? getChangePercentage(
                    dashboardData.monthlyData.ThisMonthConsumption,
                    dashboardData.monthlyData.PreviousMonthConsumption
                  )
                : undefined
            }
            icon={<BarChartIcon />}
          />
          
          <MetricCard
            title="Consumption Per Tonne"
            value={dashboardData.consumptionPerTonne?.ThisMonthConsumptionPerTonne || 0}
            unit="kVAh/t"
            subtitle="Energy Efficiency"
            changePercentage={
              dashboardData.consumptionPerTonne?.ThisMonthConsumptionPerTonne && 
              dashboardData.consumptionPerTonne?.PreviousMonthConsumptionPerTonne
                ? getChangePercentage(
                    dashboardData.consumptionPerTonne.ThisMonthConsumptionPerTonne,
                    dashboardData.consumptionPerTonne.PreviousMonthConsumptionPerTonne
                  )
                : undefined
            }
          />
          
          <MetricCard
            title="Production"
            value={dashboardData.todayData?.TodayProduction || 0}
            unit="kVAh"
            subtitle="Today's Production"
            icon={<TrendingUpIcon />}
          />
        </div>
        
        {/* Comparison Cards */}
        <div className="mb-6">
          <ComparisonSection
            consumptionPerTonne={dashboardData.consumptionPerTonne}
            monthlyData={dashboardData.monthlyData}
            todayData={dashboardData.todayData}
          />
        </div>
        
        {/* Process Cards */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Process Details</h2>
          <ProcessCardsSection processData={dashboardData.latestEnergyData} />
        </div>
        
        {/* Power Chart & Process Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <PowerSection 
            powerData={dashboardData.powerViewData} 
            currentPower={dashboardData.currentPower} 
          />
          <ProcessSection processData={dashboardData.latestEnergyData} />
        </div>
      </main>
      
      <ConnectionStatus 
        isConnected={isConnected} 
        onRetry={handleRetryConnection} 
      />
    </div>
  );
}

export default App;