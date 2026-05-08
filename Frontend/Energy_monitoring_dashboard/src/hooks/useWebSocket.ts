import { useEffect, useRef, useState } from 'react';
import { DashboardState, WebSocketMessage, ConsumptionPerTonne, MonthlyData, PowerDataPoint, TodayData, CurrentPower, ProcessEnergyData, DailyConsumptionData } from '../types/data';

const initialState: DashboardState = {
  consumptionPerTonne: null,
  monthlyData: null,
  powerViewData: [],
  todayData: null,
  currentPower: null,
  latestEnergyData: [],
  dailyConsumption: [],
};

const useWebSocket = (url: string) => {
  const [dashboardData, setDashboardData] = useState<DashboardState>(initialState);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const connectWebSocket = () => {
      try {
        const socket = new WebSocket(url);
        wsRef.current = socket;

        socket.onopen = () => {
          console.log('WebSocket connected');
          setIsConnected(true);
        };

        socket.onmessage = (event) => {
          try {
            const message: WebSocketMessage = JSON.parse(event.data);
            
            setDashboardData((prevData) => {
              switch (message.event) {
                case 'consumption_per_tonne':
                  return { 
                    ...prevData, 
                    consumptionPerTonne: message.data as ConsumptionPerTonne 
                  };
                
                case 'monthly_data':
                  return { 
                    ...prevData, 
                    monthlyData: message.data as MonthlyData 
                  };
                
                case 'power_view':
                  return { 
                    ...prevData, 
                    powerViewData: message.data as PowerDataPoint[] 
                  };
                
                case 'today_data':
                  return { 
                    ...prevData, 
                    todayData: message.data as TodayData 
                  };
                
                case 'current_power':
                  return { 
                    ...prevData, 
                    currentPower: message.data as CurrentPower 
                  };
                
                case 'latest_energy_data':
                  return { 
                    ...prevData, 
                    latestEnergyData: message.data as ProcessEnergyData[] 
                  };

                case 'daily_consumption':
                  return {
                    ...prevData,
                    dailyConsumption: message.data as DailyConsumptionData[]
                  };
                
                default:
                  return prevData;
              }
            });
          } catch (error) {
            console.error('Error parsing message:', error);
          }
        };

        socket.onclose = (event) => {
          console.log('WebSocket disconnected:', event.code, event.reason);
          setIsConnected(false);
          wsRef.current = null;
          // Try to reconnect after 1 second
          setTimeout(connectWebSocket, 1000);
        };

        socket.onerror = (error) => {
          console.error('WebSocket error:', error);
          setIsConnected(false);
          // Close the socket on error to trigger reconnection
          socket.close();
        };

        return socket;
      } catch (error) {
        console.error('Failed to connect to WebSocket:', error);
        setIsConnected(false);
        // Try to reconnect after 1 second
        setTimeout(connectWebSocket, 1000);
        return null;
      }
    };

    const socket = connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [url]);

  // Add a function to manually reconnect
  const reconnect = () => {
    if (wsRef.current) {
      wsRef.current.close();
    }
  };

  return { dashboardData, isConnected, reconnect };
};

export default useWebSocket;