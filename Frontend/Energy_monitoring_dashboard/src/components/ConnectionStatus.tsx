import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ConnectionStatusProps {
  isConnected: boolean;
  onRetry: () => void;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ isConnected, onRetry }) => {
  if (isConnected) return null;
  
  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 max-w-xs animate-slide-in">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-red-500" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-gray-900">Connection lost</h3>
          <div className="mt-2 text-sm text-gray-500">
            <p>Unable to connect to the WebSocket server. Please check your connection.</p>
          </div>
          <div className="mt-3">
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-1.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
            >
              Retry connection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionStatus;