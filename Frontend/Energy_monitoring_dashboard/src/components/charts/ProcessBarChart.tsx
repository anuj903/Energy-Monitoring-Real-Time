import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ProcessEnergyData } from '../../types/data';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ProcessBarChartProps {
  data: ProcessEnergyData[];
  valueKey: 'Power' | 'Consumption' | 'PowerFactor';
  title: string;
  unit: string;
  color?: string;
}

const ProcessBarChart: React.FC<ProcessBarChartProps> = ({
  data,
  valueKey,
  title,
  unit,
  color = 'rgba(52, 211, 153, 1)',
}) => {
  // Sort data by value (descending)
  const sortedData = [...data].sort((a, b) => b[valueKey] - a[valueKey]);
  
  // Format data for chart
  const labels = sortedData.map((item) => item.Process);
  const values = sortedData.map((item) => item[valueKey]);

  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
        backgroundColor: color,
        borderRadius: 4,
        barThickness: 20,
        maxBarThickness: 35,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#111827',
        bodyColor: '#4B5563',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `${title}: ${context.raw.toFixed(2)} ${unit}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(229, 231, 235, 0.5)',
        },
        ticks: {
          callback: function(value: any) {
            return value + (unit ? ' ' + unit : '');
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    animation: {
      duration: 500,
      easing: 'easeOutQuart',
    },
  };

  return (
    <div className="h-72 w-full">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ProcessBarChart;