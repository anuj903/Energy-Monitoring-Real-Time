import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { PowerDataPoint } from '../../types/data';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface PowerLineChartProps {
  data: PowerDataPoint[];
}

const PowerLineChart: React.FC<PowerLineChartProps> = ({ data }) => {
  // Format data for chart
  const labels = data.map((point) => point.Time.substring(0, 5)); // Format: HH:MM
  const powerValues = data.map((point) => point.Total_Power_KW);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Power (kW)',
        data: powerValues,
        borderColor: 'rgba(52, 211, 153, 1)',
        backgroundColor: 'rgba(52, 211, 153, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: 'rgba(52, 211, 153, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(52, 211, 153, 1)',
        pointHoverBorderColor: 'rgba(52, 211, 153, 1)',
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          boxWidth: 6,
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#111827',
        bodyColor: '#4B5563',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `Power: ${context.raw.toFixed(2)} kW`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(229, 231, 235, 0.5)',
        },
        ticks: {
          callback: function(value: any) {
            return value + ' kW';
          },
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
    animation: {
      duration: 750,
      easing: 'easeOutQuart',
    },
  };

  return (
    <div className="h-72 w-full">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default PowerLineChart;