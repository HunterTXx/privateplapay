
import React from 'react';
import { CalendarClock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyCyclesStateProps {
  onGoToInvestments: () => void;
}

const EmptyCyclesState: React.FC<EmptyCyclesStateProps> = ({ onGoToInvestments }) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
      <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <CalendarClock className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-medium mb-2">No Active Cycles</h3>
      <p className="text-slate-500 mb-4">
        Create an investment to start your first recycling cycle
      </p>
      <Button
        className="bg-investment-green hover:bg-green-600"
        onClick={onGoToInvestments}
      >
        Go to Investments
      </Button>
    </div>
  );
};

export default EmptyCyclesState;
