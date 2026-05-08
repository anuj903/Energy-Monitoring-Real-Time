import React from 'react';
import { Zap } from 'lucide-react';

interface HeaderProps {
  isConnected: boolean;
}

const Header: React.FC<HeaderProps> = ({ isConnected }) => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Zap className="h-7 w-7 text-emerald-600 mr-2" />
            <h1 className="text-xl font-semibold text-gray-800">Energy Monitoring Dashboard</h1>
          </div>
          
          <div className="flex items-center">
            <div className="mr-4 hidden md:block">
              <span className="text-sm text-gray-600">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            
            <div className="flex items-center">
              <div 
                className={`w-2 h-2 rounded-full mr-2 ${
                  isConnected ? 'bg-emerald-500' : 'bg-red-500'
                }`} 
              />
              <span className="text-sm font-medium text-gray-700">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;