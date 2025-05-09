
import React from 'react';
import { Loader } from 'lucide-react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex justify-center py-12">
      <Loader className="h-8 w-8 animate-spin text-investment-green" />
    </div>
  );
};

export default LoadingState;
