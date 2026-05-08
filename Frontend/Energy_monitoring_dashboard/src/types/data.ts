export interface ConsumptionPerTonne {
  ThisMonthConsumptionPerTonne: number;
  PreviousMonthConsumptionPerTonne: number;
}

export interface DailyConsumptionData {
  date: string;
  consumptionPerTonne: number;
}

export interface MonthlyData {
  ThisMonthConsumption: number;
  PreviousMonthConsumption: number;
}

export interface PowerDataPoint {
  Date: string;
  Time: string;
  Total_Power_KW: number;
  Timestamp: string;
}

export interface TodayData {
  TodayConsumption: number;
  TodayProduction: number;
}

export interface CurrentPower {
  TotalPower: number;
}

export interface ProcessEnergyData {
  Process: string;
  Power: number;
  Consumption: number;
  PowerFactor: number;
}

export interface WebSocketMessage {
  event: string;
  data: ConsumptionPerTonne | MonthlyData | PowerDataPoint[] | TodayData | CurrentPower | ProcessEnergyData[] | DailyConsumptionData[];
}

export interface DashboardState {
  consumptionPerTonne: ConsumptionPerTonne | null;
  monthlyData: MonthlyData | null;
  powerViewData: PowerDataPoint[];
  todayData: TodayData | null;
  currentPower: CurrentPower | null;
  latestEnergyData: ProcessEnergyData[];
  dailyConsumption: DailyConsumptionData[];
}