
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message = "Please try again later" }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-2" />
      <div>
        <h3 className="font-medium text-red-800">Error loading investments</h3>
        <p className="text-sm text-red-700">{message}</p>
      </div>
    </div>
  );
};

export default ErrorState;
