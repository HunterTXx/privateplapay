
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface EmptyInvestmentStateProps {
  onCreateNew: () => void;
}

const EmptyInvestmentState: React.FC<EmptyInvestmentStateProps> = ({ onCreateNew }) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
      <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <PlusCircle className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-medium mb-2">No Investments Yet</h3>
      <p className="text-slate-500 mb-4">
        Start your first investment in sustainable plastic recycling and earn up to 12% monthly returns
      </p>
      <Button
        className="bg-investment-green hover:bg-green-600"
        onClick={onCreateNew}
      >
        Start Investing Now
      </Button>
    </div>
  );
};

export default EmptyInvestmentState;
